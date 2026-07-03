#!/usr/bin/osascript

-- ============================================================
-- exportar_a_keynote.applescript  (v3)
-- Crea una presentación Keynote con cada slide-XX.png
-- como diapositiva a página completa.
-- Estrategia: slide en blanco + imagen encima (sin tocar placeholders).
-- ============================================================

set slidesFolderPOSIX to "/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/El_Cuerpo_Electrico_RB/Estrategia_Comercial/Slides_Webinar/export_slides/"
set outputPath to "/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/El_Cuerpo_Electrico_RB/Estrategia_Comercial/Slides_Webinar/El_Cuerpo_Electrico_Webinar.key"

-- Construir lista de alias de los PNGs en orden
set fileList to {}
repeat with i from 1 to 44
	if i < 10 then
		set numStr to "0" & (i as text)
	else
		set numStr to (i as text)
	end if
	set imgPOSIX to slidesFolderPOSIX & "slide-" & numStr & ".png"
	try
		set imgAlias to (POSIX file imgPOSIX) as alias
		set end of fileList to imgAlias
	end try
end repeat

set slideCount to count of fileList
if slideCount is 0 then
	display dialog "No se encontraron archivos en export_slides." buttons {"OK"}
	return
end if

tell application "Keynote"
	activate
	
	-- Crear documento 1280x720 (16:9) con tema en blanco
	set newDoc to make new document with properties {document theme: theme "Blanco", width: 1280, height: 720}
	
	repeat with i from 1 to slideCount
		set imgAlias to item i of fileList
		
		if i is 1 then
			set curSlide to slide 1 of newDoc
			-- Cambiar layout a "En blanco" para eliminar placeholders visibles
			set base layout of curSlide to master slide "En blanco" of newDoc
		else
			-- Añadir slide con layout en blanco directamente
			set curSlide to make new slide at end of slides of newDoc with properties ¬
				{base layout: master slide "En blanco" of newDoc}
		end if
		
		-- Insertar imagen cubriendo todo el slide (1280x720)
		tell curSlide
			make new image with properties ¬
				{file: imgAlias, position: {0, 0}, width: 1280, height: 720}
		end tell
		
	end repeat
	
	-- Guardar
	save newDoc in POSIX file outputPath
	
	set dialogResult to display dialog "✅ " & slideCount & " diapositivas creadas en Keynote." & return & return & outputPath ¬
		buttons {"Listo", "Abrir"} default button "Abrir"
	
	if button returned of dialogResult is "Abrir" then
		open (POSIX file outputPath as alias)
	end if
	
end tell
