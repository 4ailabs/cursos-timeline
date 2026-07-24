-- Crea una presentación Keynote 16:9 usando las PNG exportadas del deck HTML.
-- Uso: osascript armar_keynote.applescript
-- Requiere: haber corrido antes `node exportar_slides.js`.

set slideW to 1920
set slideH to 1080

set scriptFile to (path to me)
tell application "System Events"
	set baseDir to POSIX path of (container of scriptFile)
	if baseDir does not end with "/" then set baseDir to baseDir & "/"
end tell

set outPath to baseDir & "Reset_Hormonal_Tu_Mapa_Hormonal.key"

set pngList to {}
tell application "System Events"
	repeat with i from 1 to 99
		set numberText to i as text
		if i < 10 then set numberText to "0" & numberText
		set candidatePath to baseDir & "export_png/slide_" & numberText & ".png"
		if exists file candidatePath then set end of pngList to (file candidatePath as alias)
	end repeat
end tell

if (count of pngList) is 0 then
	error "No hay PNG en export_png/. Corre primero: node exportar_slides.js"
end if

tell application "Keynote"
	activate
	set newDoc to make new document with properties {width:slideW, height:slideH}
	tell newDoc
		set idx to 0
		repeat with pngPath in pngList
			set idx to idx + 1
			if idx = 1 then
				set theSlide to slide 1 of newDoc
			else
				set theSlide to make new slide at end of slides
			end if
			tell theSlide
				make new image with properties {file:pngPath, position:{0, 0}, width:slideW, height:slideH}
			end tell
		end repeat
	end tell
	save newDoc in POSIX file outPath
end tell

do shell script "echo 'Keynote guardado en: " & outPath & "'"
