import bpy
import os
from mathutils import Vector


# Limpieza independiente del editor activo.
for obj in list(bpy.data.objects):
    bpy.data.objects.remove(obj, do_unlink=True)

scene = bpy.context.scene
scene.unit_settings.system = "METRIC"
scene.unit_settings.length_unit = "MILLIMETERS"
scene.render.engine = "BLENDER_WORKBENCH"
scene.display.shading.light = "STUDIO"
scene.display.shading.color_type = "MATERIAL"
scene.display.shading.show_shadows = True
scene.display.shading.show_cavity = True
scene.display.shading.cavity_type = "WORLD"
scene.display.shading.show_specular_highlight = True
scene.display.shading.background_type = "WORLD"
scene.render.resolution_x = 1400
scene.render.resolution_y = 1050
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.world.use_nodes = True
background = scene.world.node_tree.nodes.get("Background")
background.inputs["Color"].default_value = (0.004, 0.006, 0.012, 1)
background.inputs["Strength"].default_value = 0.22


def material(name, color, metallic=0.0, roughness=0.4, alpha=1.0):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.diffuse_color = (*color, alpha)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = (*color, 1)
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Alpha"].default_value = alpha
    if alpha < 1:
        if hasattr(mat, "surface_render_method"):
            try:
                mat.surface_render_method = "DITHERED"
            except Exception:
                pass
        if hasattr(mat, "blend_method"):
            try:
                mat.blend_method = "BLEND"
            except Exception:
                pass
    return mat


materials = {
    "cover": material("ABS_cubierta_translucida", (0.08, 0.10, 0.16), 0.05, 0.32, 0.28),
    "support": material("ABS_separador_translucido", (0.12, 0.15, 0.22), 0.05, 0.38, 0.32),
    "frame": material("Marco_ABS", (0.035, 0.045, 0.070), 0.1, 0.3),
    "north": material("Polo_N_azul", (0.025, 0.32, 0.95), 0.68, 0.18),
    "south": material("Polo_S_rojo", (0.95, 0.055, 0.02), 0.68, 0.18),
    "base": material("Neodimio_N52_base", (0.035, 0.17, 0.65), 0.70, 0.2),
    "flux": material("Acero_FeSi_GO", (0.55, 0.60, 0.68), 0.88, 0.15, 0.94),
    "white": material("Rotulos_blancos", (0.92, 0.96, 1.0), 0.05, 0.32),
    "gold": material("Lineas_tecnicas", (1.0, 0.48, 0.035), 0.35, 0.25),
    "green": material("Lado_paciente", (0.12, 0.75, 0.28), 0.1, 0.35),
    "floor": material("Fondo_tecnico", (0.012, 0.018, 0.032), 0.0, 0.5),
}

root = bpy.data.collections.new("PROTOTIPO_Placa_Magnetica_Hibrida")
scene.collection.children.link(root)


def move_to_root(obj):
    for collection in list(obj.users_collection):
        collection.objects.unlink(obj)
    root.objects.link(obj)


def box(name, dimensions, mat, parent=None, location=(0, 0, 0), bevel=0.001):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    modifier = obj.modifiers.new("Redondeo", "BEVEL")
    modifier.width = bevel
    modifier.segments = 4
    obj.data.materials.append(mat)
    move_to_root(obj)
    obj.parent = parent
    return obj


def cylinder(name, radius, depth, mat, parent=None, location=(0, 0, 0)):
    bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=radius, depth=depth, location=location)
    obj = bpy.context.object
    obj.name = name
    modifier = obj.modifiers.new("Redondeo", "BEVEL")
    modifier.width = min(0.00065, depth * 0.12)
    modifier.segments = 4
    obj.data.materials.append(mat)
    move_to_root(obj)
    obj.parent = parent
    return obj


def torus(name, major_radius, minor_radius, mat, parent=None, location=(0, 0, 0)):
    bpy.ops.mesh.primitive_torus_add(
        major_radius=major_radius,
        minor_radius=minor_radius,
        major_segments=64,
        minor_segments=10,
        location=location,
    )
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    move_to_root(obj)
    obj.parent = parent
    return obj


def text(name, body, location, size, mat, parent=None, align="CENTER"):
    bpy.ops.object.text_add(location=location)
    obj = bpy.context.object
    obj.name = name
    obj.data.body = body
    obj.data.align_x = align
    obj.data.align_y = "CENTER"
    obj.data.size = size
    obj.data.extrude = 0.00010
    obj.data.bevel_depth = 0.00003
    obj.data.materials.append(mat)
    move_to_root(obj)
    obj.parent = parent
    return obj


def line(name, start, end, mat, parent=None, radius=0.00022):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = radius
    curve.bevel_resolution = 3
    spline = curve.splines.new("POLY")
    spline.points.add(1)
    spline.points[0].co = (*start, 1)
    spline.points[1].co = (*end, 1)
    obj = bpy.data.objects.new(name, curve)
    root.objects.link(obj)
    obj.data.materials.append(mat)
    obj.parent = parent
    return obj


# Control 0 = ensamblado, 1 = explosionado.
bpy.ops.object.empty_add(type="PLAIN_AXES", location=(0, 0, 0))
control = bpy.context.object
control.name = "CONTROL_Placa_Magnetica"
move_to_root(control)
control["Explosion"] = 0.55
control.id_properties_ui("Explosion").update(
    min=0.0, max=1.0, soft_min=0.0, soft_max=1.0,
    description="0 = ensamblado, 1 = explosionado",
)

heights = [0.0025, 0.006, 0.005, 0.015, 0.0015]
layer_names = [
    "01_Cubierta_protectora_ABS_2.5mm",
    "02_Rejilla_2x2_N48_6mm",
    "03_Soporte_separador_ABS_5mm",
    "04_Iman_base_N52_15mm",
    "05_Placa_flujo_FeSi_1.5mm",
]
centers = []
accumulated = 0.0
for height in heights:
    centers.append(accumulated + height / 2)
    accumulated += height

layers = []
exploded_gap = 0.014
for index, (name, base_z) in enumerate(zip(layer_names, centers)):
    bpy.ops.object.empty_add(type="CUBE", location=(0, 0, base_z + index * exploded_gap * control["Explosion"]))
    layer = bpy.context.object
    layer.name = name
    layer.empty_display_size = 0.006
    move_to_root(layer)
    driver = layer.driver_add("location", 2).driver
    driver.expression = f"{base_z}+{index * exploded_gap}*expl"
    variable = driver.variables.new()
    variable.name = "expl"
    variable.type = "SINGLE_PROP"
    variable.targets[0].id = control
    variable.targets[0].data_path = '["Explosion"]'
    layers.append(layer)

# 1. Cubierta protectora 55 x 55 x 2.5 mm.
box("Cubierta_ABS_55x55x2.5", (0.055, 0.055, 0.0025), materials["cover"], layers[0], bevel=0.003)
for x, y, dx, dy in [(0, .0265, .055, .002), (0, -.0265, .055, .002), (.0265, 0, .002, .055), (-.0265, 0, .002, .055)]:
    box("Borde_cubierta", (dx, dy, .0026), materials["frame"], layers[0], (x, y, 0), .0007)

# 2. Rejilla 2 x 2, cuatro imanes N48 de 18 x 6 mm.
poles = [["N", "S"], ["S", "N"]]
for row in range(2):
    for column in range(2):
        pole = poles[row][column]
        x = (column - 0.5) * 0.020
        y = (row - 0.5) * 0.020
        pole_material = materials["north"] if pole == "N" else materials["south"]
        cylinder(f"Rejilla_{pole}_r{row+1}c{column+1}_D18x6", .009, .006, pole_material, layers[1], (x, y, 0))
        torus(f"Anillo_{pole}_r{row+1}c{column+1}", .00835, .00042, materials["white"], layers[1], (x, y, .00315))
        text(f"Polo_{pole}_r{row+1}c{column+1}", pole, (x, y, .00375), .0044, materials["white"], layers[1])
for x, y, dx, dy in [(0, .0265, .055, .002), (0, -.0265, .055, .002), (.0265, 0, .002, .055), (-.0265, 0, .002, .055)]:
    box("Marco_rejilla", (dx, dy, .006), materials["frame"], layers[1], (x, y, 0), .0006)

# 3. Soporte separador.
box("Soporte_ABS_55x55x5", (.055, .055, .005), materials["support"], layers[2], bevel=.003)
torus("Rebaje_soporte_D50", .025, .00055, materials["gold"], layers[2], (0, 0, .0026))

# 4. Imán base N52.
cylinder("Iman_base_N52_D50x15", .025, .015, materials["base"], layers[3])
torus("Anillo_superior_base", .0242, .00055, materials["white"], layers[3], (0, 0, .0076))
text("Rotulo_base_N", "N", (0, .004, .0081), .0075, materials["white"], layers[3])
text("Rotulo_base_medida", "D50 x 15 mm", (0, -.010, .0081), .0024, materials["white"], layers[3])

# 5. Placa de flujo.
box("Placa_flujo_FeSi_GO_55x55x1.5", (.055, .055, .0015), materials["flux"], layers[4], bevel=.002)

labels = [
    "1  CUBIERTA ABS | 55x55x2.5",
    "2  REJILLA N48 | 4 x D18x6",
    "3  SEPARADOR ABS | 55x55x5",
    "4  BASE N52 | D50x15",
    "5  FLUX Fe-Si GO | 55x55x1.5",
]
for index, label in enumerate(labels):
    text(f"Etiqueta_capa_{index+1}", label, (.041, 0, 0), .0026, materials["white"], layers[index], "LEFT")
    line(f"Guia_capa_{index+1}", (.029, 0, 0), (.039, 0, 0), materials["gold"], layers[index], .00018)

text("Etiqueta_paciente", "LADO PACIENTE  v", (0, -.043, -.002), .0034, materials["green"])
text("Titulo_producto", "PLACA MAGNETICA HIBRIDA | 55 x 55 x 30 mm", (-.054, .050, 0), .0034, materials["white"], align="LEFT")
box("Mesa_tecnica", (.19, .15, .004), materials["floor"], location=(0, 0, -.012), bevel=.004)


def look_at(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


bpy.ops.object.camera_add(location=(.145, -.175, .115))
camera = bpy.context.object
camera.name = "Camara_producto"
move_to_root(camera)
camera.data.type = "ORTHO"
camera.data.ortho_scale = .145
look_at(camera, (.012, 0, .035))
scene.camera = camera

for name, location, energy, size, color in [
    ("Key", (.07, -.08, .17), 95, .10, (1.0, .91, .80)),
    ("Fill", (-.10, -.03, .10), 65, .09, (.55, .70, 1.0)),
    ("Rim", (.02, .12, .14), 85, .08, (.75, .85, 1.0)),
]:
    bpy.ops.object.light_add(type="AREA", location=location)
    light = bpy.context.object
    light.name = name
    move_to_root(light)
    light.data.energy = energy
    light.data.shape = "DISK"
    light.data.size = size
    light.data.color = color
    look_at(light, (0, 0, .035))

output_dir = "/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/El_Cuerpo_Electrico_RB/Referencia/Punto_Trauma/Imagenes_Productos_Magneticos"
os.makedirs(output_dir, exist_ok=True)
blend_path = os.path.join(output_dir, "prototipo_placa_magnetica_hibrida.blend")
assembled_path = os.path.join(output_dir, "prototipo_placa_magnetica_ensamblada.png")
exploded_path = os.path.join(output_dir, "prototipo_placa_magnetica_explosionada.png")

control["Explosion"] = 0.0
scene.frame_set(scene.frame_current)
scene.render.filepath = assembled_path
bpy.ops.render.render(write_still=True)

control["Explosion"] = 0.55
scene.frame_set(scene.frame_current)
scene.render.filepath = exploded_path
bpy.ops.render.render(write_still=True)
bpy.ops.wm.save_as_mainfile(filepath=blend_path)

print({
    "blend": blend_path,
    "ensamblada": assembled_path,
    "explosionada": exploded_path,
    "control": "CONTROL_Placa_Magnetica[Explosion]",
    "dimensiones_mm": [55, 55, 30],
})
