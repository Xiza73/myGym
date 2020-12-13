const gym = new Vue({
    el: '#gym',
    data: {
        title: "My Gym",
        estado: {
            "1": "En Curso",
            "-1": "Finalizado"
        },
        check: {
            "1": "done",
            "-1": "clear"
        },
        ocultar: "d-none",
        //var 
        selectedValue: "",
        activities: [],
        
        //v-model
        nombre: "", 
        newUser: "", 
        actUser: "",

        //Pseudo DB
        actividades: ["","Natación", "Atletismo", "Pesas", "Bailecito"],

        //activities: [], //{nombre: "Pesas", estado: this.estado[1]}
        usuarios: null, //"Pepito" : {peso: "70kg", rutina: activities[]}
        nombres: []
    },
    methods: {
        // incio(){
        //     this.activities = JSON.parse(localStorage.getItem('rutina'))
        // },
        guardarDB(){
            //Guardar en el localStorage
            localStorage.setItem('usuarios', JSON.stringify(this.usuarios))
            localStorage.setItem('nombres', JSON.stringify(this.nombres))
        },
        actualizarUsuario(){
            if(this.nombre){
                this.usuarios[this.nombre].rutina = this.activities
            }
        },
        registrar(){
            this.nombres.push(this.newUser)
            if(this.usuarios != null){
                this.usuarios[this.newUser] = {rutina: []}
            }else{
                console.log("estoy pendejo")
                this.usuarios = {}
                this.usuarios[this.newUser] = {rutina: []}
            }
            this.guardarDB()
            location.reload()
        },
        addActivity(){
            var data_gym = document.getElementById("data_gym").value; 
            if(data_gym != ""){
                this.activities.push({
                    nombre: data_gym,
                    estado: 1,
                })
                document.getElementById("form_gym").reset()
                this.actualizarUsuario();
                this.guardarDB();
            }
        },
        chEstado(actividad){
            event.preventDefault()
            this.activities[this.activities.indexOf(actividad)].estado *= -1;
            this.actualizarUsuario();
            this.guardarDB();
        },
        delActividad(actividad){
            event.preventDefault()
            this.activities.splice(this.activities.indexOf(actividad), 1)
            this.actualizarUsuario();
            this.guardarDB();
        }
    },
    computed: {
        nSelec(){
            console.log(this.nombre)
            if(this.usuarios != null && this.nombre != ""){
                this.activities = this.usuarios[this.nombre].rutina
            }else{
                this.activities = []
            }
            if(this.nombre != ""){
                return `Ejercicios de ${this.nombre}`
            }else{
                return ""
            }
        }
    },
    created: function(){
        //inicia el localStorage
        if(JSON.parse(localStorage.getItem('usuarios'))){
            this.usuarios = JSON.parse(localStorage.getItem('usuarios'))
        }
        if(JSON.parse(localStorage.getItem('nombres'))){
            this.nombres = JSON.parse(localStorage.getItem('nombres'))
        }
    }
})
// :class="var ? classTrue : classFalse"
// document.addEventListener('DOMContentLoadded', gym.incio())
