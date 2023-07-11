const { createApp } = Vue
createApp({
    data() {
        return {
            productos: [],
            url: 'http://devburgercac.pythonanywhere.com/productos',   // si ya lo subieron a pythonanywhere
            error: false,
            cargando: true,
            ProdID: 0,
            ProdNombre: "",
            ProdDescrp: "",
            ProdPrecio: 0,
            ProdImg: ""
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando = false
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(ProdID) {
            const url = this.url + '/' + ProdID;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
                .catch(err => {
                    console.error(err);
                    alert('Error al eliminar el registro');
                });
        },
        grabar() {
            let producto = {
                ProdNombre: this.ProdNombre,
                ProdDescrp: this.ProdDescrp,
                ProdImg: this.ProdImg,
                ProdPrecio: this.ProdPrecio,
            };
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            fetch(this.url, options)
                .then(response => {
                    console.log(response);
                    alert("Registro grabado");
                    this.fetchData(this.url); // Fetch updated data
                    this.ProdNombre = ""; // Reset form fields
                    this.ProdDescrp = "";
                    this.ProdPrecio = 0;
                    this.ProdImg = "";
                    // window.location.href = "abmmenu.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar");
                });
        },

    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')
