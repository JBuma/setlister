$("#sidebarToggler").click(function(){
    $("#sidebarMenu").sidebar("setting","transition","overlay").sidebar("setting","mobileTransition","overlay").sidebar('toggle');
});

$("#playlistToggler").click(function(){
    $("#sidebarPlaylist").sidebar("setting","transition","overlay").sidebar("setting","mobileTransition","overlay").sidebar('toggle');
});