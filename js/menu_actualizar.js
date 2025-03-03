console.log(location.search)     // lee los argumentos pasados a este formulario
// var id = location.search.substr(4) || 0;  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
createApp({
    data() {
        var ProdID = location.search.substr(4) || 0;
        return {
            nombre: "",
            ProdID,
            imagen: "",
            precio: 0,
            stock: 0,
            descripcion: "",
            url: 'https://devburgercac.pythonanywhere.com/productos/' + ProdID,
            error: false,
        };
    },


    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.nombre = data.nombre;
                    this.imagen = data.imagen;
                    this.descripcion = data.descripcion;
                    this.precio = data.precio;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        modificar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                descripcion: this.descripcion,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./abmmenu.html"; // navega a abmmenu.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')
