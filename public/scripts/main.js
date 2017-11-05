$("#sidebarToggler").click(function(){
    $("#sidebarMenu").sidebar("setting","transition","overlay").sidebar("setting","mobileTransition","overlay").sidebar('toggle');
});

$("#playlistToggler").click(function(){
    $("#sidebarPlaylist").sidebar('setting','closable',false).sidebar('setting','dimPage',false).sidebar("setting","transition","overlay").sidebar("setting","mobileTransition","overlay").sidebar('toggle');
});
$('#closePlaylistButton').click(function(){
    $('#sidebarPlaylist').sidebar('toggle');
})
// $('#openPlaylistButton').click(function(){
//     $('#sidebarPlaylist').sidebar('setting','closable',false).sidebar('setting','dimPage',false).sidebar("setting","transition","overlay").sidebar('toggle');
// })

$('#showAddSongForm').click(function(){
    $('#addSongForm').modal('show');
})
