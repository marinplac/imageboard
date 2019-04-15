(function() {
    new Vue({
        el: "#main",
        data: {
            images: []
        },
        mounted: function() {
            var app = this;
            axios.get("/images").then(function(res) {
                app.images = res.data;
                console.log("responded data", res.data);
            });
        }
    });
});
