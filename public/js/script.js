(function() {
    new Vue({
        el: "#main",
        data: {
            images: [],
            form: {
                title: "",
                description: "",
                username: "",
                file: null
            }
        },
        mounted: function() {
            var app = this;
            axios.get("/imageboard").then(function(res) {
                app.images = res.data;
                console.log("responded data", res.data);
            });
        },
        //every single funct that runs in response to an event
        //is defined in "methods"
        methods: {
            handleFileChange: function(evt) {
                console.log("file: ", evt.target.files[0]);
                //this stores the file that was just selected
                this.form.file = evt.target.files[0];
                // console.log("this: ", this);
            },
            uploadFile: function() {
                // formdata is used to send files to server!
                var formData = new FormData();
                formData.append("file", this.form.file);
                formData.append("username", this.form.username);
                formData.append("title", this.form.title);
                formData.append("description", this.form.description);

                axios.post("/upload", formData).then(
                    function(res) {
                        this.images.unshift({
                            url: res.data.url,
                            created_at: Date.now(),
                            description: res.data.description,
                            id: res.data.id,
                            title: res.data.title,
                            username: res.data.username
                        });
                    }.bind(this)
                );
            }
        }
    });
})();
