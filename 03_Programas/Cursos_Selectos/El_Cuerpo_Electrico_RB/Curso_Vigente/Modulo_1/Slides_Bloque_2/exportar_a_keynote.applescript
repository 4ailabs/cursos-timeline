#!/usr/bin/osascript

-- ============================================================
-- exportar_a_keynote.applescript — Bloque 2 "El instrumento y el sustrato"
-- Arma una presentación Keynote con cada slide-XX.png a página completa.
-- PNGs 2560x1440 (16:9) → doc Keynote 1280x720. Sin distorsión.
-- ============================================================

set slidesFolderPOSIX to "/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/El_Cuerpo_Electrico_RB/Curso_Vigente/Slides_Modulo1_Bloque2/export_png/"
set outputPath to "/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/El_Cuerpo_Electrico_RB/Curso_Vigente/Slides_Modulo1_Bloque2/Modulo1_Bloque2_El_Instrumento_y_el_Sustrato.key"

set fileList to {}
repeat with i from 1 to 23
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
	return "ERROR: no se encontraron PNGs en export_png/"
end if

tell application "Keynote"
	activate
	set newDoc to make new document with properties {document theme: theme "Blanco", width: 1280, height: 720}

	repeat with i from 1 to slideCount
		set imgAlias to item i of fileList
		if i is 1 then
			set curSlide to slide 1 of newDoc
			set base layout of curSlide to master slide "En blanco" of newDoc
		else
			set curSlide to make new slide at end of slides of newDoc with properties ¬
				{base layout: master slide "En blanco" of newDoc}
		end if
		tell curSlide
			make new image with properties ¬
				{file: imgAlias, position: {0, 0}, width: 1280, height: 720}
		end tell
	end repeat

	save newDoc in POSIX file outputPath
end tell

return "OK: " & slideCount & " diapositivas → " & outputPath
