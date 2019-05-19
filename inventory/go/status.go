package main

import (
	"html/template"
	"net/http"
)

func StatusHandleFunc(w http.ResponseWriter, r *http.Request) {
	t, err := template.New("summary").Parse(`
<body>
<div id="container">
	Summary
</div>
</body>`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := struct{}{}

	if err := t.Execute(w, &data); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
