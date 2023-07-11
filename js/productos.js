var { createApp } = Vue
  createApp({
    data() {
      return {
        productos:[],
        url:'https://devburgercac.pythonanywhere.com/productos',
        error:false,
        cargando:true,
    };
    },
    methods: {
        fetchData(url) {
            fetch(url)
            .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        addToCart(item) {
            this[item + "Items"] += 1;
          },
          decreaseQuantity(item) {
            if (this[item + "Items"] > 0) {
              this[item + "Items"] -= 1;
            }
          },
          clearItem(item) {
            this[item + "Items"] = 0;
          },
          checkout() {
            console.log("¡Pagado!");
          },
          clearAll() {
            if (window.confirm("¿Estás seguro de que deseas limpiar todo?")) {
              this.cplusplusItems = 0;
              this.pythonItems = 0;
              this.javaItems = 0;
              this.rubyItems = 0;
              this.phpItems = 0;
              // Set the remaining variables to 0
              console.log("Vaciaste el carrito.");
            }
          },
    },
    created() {
        this.fetchData(this.url);
    },
  }).mount('#app');