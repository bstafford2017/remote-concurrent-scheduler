$.ajax({
    type: "get",
    url: "api/user/admin",
    success: function(response){
        if(response.admin === 'true'){
            $('#left-nav').append('<li class="nav-item" id="manage-buildings"><a class="nav-link" href="manageBuildings.html">Manage Buildings</a></li>')
            $('#left-nav').append('<li class="nav-item" id="manage-rooms"><a class="nav-link" href="manageRooms.html">Manage Rooms</a></li>')
            $('#left-nav').append('<li class="nav-item" id="manage-users"><a class="nav-link" href="manageUsers.html">Manage Users</a></li>')
        }
    }
})