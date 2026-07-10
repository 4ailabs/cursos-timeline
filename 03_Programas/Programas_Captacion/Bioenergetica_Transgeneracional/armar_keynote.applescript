-- Arma un Keynote 16:9 con las PNG de export_slides_png/, una imagen por diapositiva a pantalla completa.
-- Uso:  osascript armar_keynote.applescript
-- Requiere: haber corrido antes  node exportar_slides.js

set slideW to 1920
set slideH to 1080

-- Carpeta del script
tell application "System Events"
    set scriptPath to POSIX path of (path to me)
end tell
set baseDir to do shell script "dirname " & quoted form of scriptPath
set pngDir to baseDir & "/export_slides_png"
set outPath to baseDir & "/Sesion1_El_Mapa_Que_Cargas.key"

-- Lista ordenada de PNG
set pngList to paragraphs of (do shell script "ls " & quoted form of pngDir & "/slide_*.png | sort")
if (count of pngList) is 0 then
    display dialog "No hay PNG en export_slides_png/. Corre primero: node exportar_slides.js" buttons {"OK"}
    return
end if

tell application "Keynote"
    activate
    -- documento nuevo con tamaño 16:9 exacto
    set newDoc to make new document with properties {width:slideW, height:slideH}

    tell newDoc
        set idx to 0
        repeat with pngPath in pngList
            set idx to idx + 1
            if idx = 1 then
                set theSlide to slide 1
            else
                set theSlide to make new slide at end of slides
            end if
            -- deja la diapositiva sin elementos de plantilla (fondo blanco), imagen full-bleed
            tell theSlide
                set theImage to make new image with properties {file:(POSIX file (contents of pngPath)), position:{0, 0}, width:slideW, height:slideH}
            end tell
        end repeat
    end tell

    save newDoc in POSIX file outPath
end tell

do shell script "echo 'Keynote guardado en: " & outPath & "'"
