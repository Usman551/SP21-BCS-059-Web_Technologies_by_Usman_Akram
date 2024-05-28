
  $(function () {
    loadRecipies();
    $("#recipiesList").on("click", "#deletebtn", handleDelete);
    $("#addBtn").click(addRecipie);
    $("#recipiesList").on("click", "#editbtn", handleUpdate);
    $("#updatebtn").click(function () {
      var id = $("#updateId").val();
      var title = $("#title").val();
      var content = $("#content").val();
      $.ajax({
        url: "https://usmanlive.com/wp-json/api/stories/" + id,
        method: "PUT",
        data: { title, content },
        success: function (responce) {
          loadRecipies();
          alert("Recipie updated successfully");
          $("#title").val("");
          $("#content").val("");
  
        },
        error: function () {
          alert("Recipie not updated");
        }
      })
    })
  });
  
  function handleUpdate() {
    var parentDiv = $(this).closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.get("https://usmanlive.com/wp-json/api/stories/" + id, function (responce) {
      $("#updateId").val(responce.id);
      $("#title").val(responce.title);
      $("#content").val(responce.content);
  
  
    })
  }
  
  function loadRecipies() {
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories",
      method: "GET",
      success: function (responce) {
        $("#recipiesList").empty();
        for (var i = 0; i < responce.length; i++) {
          var rec = responce[i];
          $("#recipiesList").append(
            `<div class = "recipe" data-id = "${rec.id}">
                      <div class="menu-card hover:card">
  
                  <figure class="card-banner img-holder" style="--width: 100; --height: 100;">
                    <img src="/images/menu-1.png" width="100" height="100" loading="lazy" alt="Greek Salad"
                      class="img-cover">
                  </figure>
  
                  <div>
  
                    <div class="title-wrapper">
                      <h3 class="title-3">
                        <a href="#" class="card-title">${rec.title}</a>
                      </h3>
  
                      <span class="badge label-1">New</span>
  
                      <span class="span title-2">$25.50</span>
                    </div>
  
                    <p class="card-text label-1">
                      ${rec.content}
                    </p>
  
                  </div>
                  </div>
                  <div class = "editdelbuttondiv">
                  <div><a class="btn btn-primary" id = "editbtn">
                  <span class="text text-1">Edit</span>
      
                  <span class="text text-2" aria-hidden="true">Edit</span>
                </a></div>
                  <div id = "deletebtn"><a class="btn btn-primary">
                  <span class="text text-1">Delete</span>
      
                  <span class="text text-2" aria-hidden="true">Delete</span>
                </a></div>
                </div>
                  
                  </div>`)
  
        }
      },
      error: function () {
        $("#recipiesList").html("An error occured...");
      }
    });
  }
  
  function addRecipie() {
    var title = $("#title").val();
    var content = $("#content").val();
  
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories",
      method: "POST",
      data: { title, content },
      success: function (responce) {
        $("#title").val("");
        $("#content").val("");
        loadRecipies();
        alert("Recipe added successfully");
      },
      error: function () {
        alert("Recipie not added");
      }
    });
  }
  
  function handleDelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories/" + id,
      method: "DELETE",
      success: function () {
        loadRecipies();
      },
      error: function () {
        alert("Recipie not deleted");
      }
    });
  }
