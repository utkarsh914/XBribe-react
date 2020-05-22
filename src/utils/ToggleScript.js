export const Script = {
  append: (id, source) => {
    const script = document.createElement("script");
    script.id = id;
    script.src = source;
    script.async = true;
    document.body.appendChild(script);
  },
  remove: (id) => {
    document.getElementById(id).remove();
  }
}