(function() {
    Vue.component("image-modal", {
        props: ["id"],
        data: function() {
            return {
                imagedata: "",
                imagedetails: [],
                commform: {
                    comment: "",
                    username: ""
                }
            };
        },
        mounted: function() {
            let self = this;
            axios.get("/image/" + self.id).then(function(res) {
                console.log(res);
                self.imagedetails = res.data[0];
            });
            axios.get("/comment/" + this.id).then(function(res) {
                this.comment = res.data;
            });
        },
        methods: {
            newComm: function() {
                var allParm = {
                    username: this.commform.username,
                    image_id: this.id,
                    comment: this.commform.comment
                };
                // var username = ;
                // var image_id = this.id;
                // console.log("this image id", image_id);
                // var comment = this.commform.comment;
                axios.post("/newcomment", allParm).then(function(res) {
                    console.log("good tag for res", res);
                });
            }
        },
        template: `#modal`,
        //the watchers
        watch: {
            id: function() {
                let self = this;
                axios.get("/image/" + this.id).then(function(res) {
                    // console.log(data, "the image id changed!");
                    self.imagedetails = res.data;
                    // this.item = data[0];
                });
            }
        }
    });

    new Vue({
        el: "#main",
        data: {
            currentimage: 0,
            images: [],
            form: {
                title: "",
                description: "",
                username: "",
                file: null
            }
        },
        mounted: function() {
            var self = this;
            axios.get("/imageboard").then(function(res) {
                self.images = res.data;
                console.log("responded data", res.data);
            });
        },

        methods: {
            openModal: function(id) {
                // console.log(id);
                this.currentimage = id;
            },
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
