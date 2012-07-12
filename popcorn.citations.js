// Provide an object
// Popcorn will manage the events 
(function (Popcorn) {  
  Popcorn.plugin( "citation" , {
    

    _setup : function( options ) {
    options._titles = new Array();   
    if ($("div[id=" + options.name + "]").length == 0) { // no element found
    	$("<div/>", { "class": "citations", "id": options.name }).appendTo("#" + options.target);
        $("div[id=" + options.name + "]").hide();
       
         $.getJSON("http://metaviddemo01.ucsc.edu/dev2pcast/citations.php?jsoncallback=?", {"name" : options.name}, function(data) {          
            $.each(data.papers, function(i,paper){
                pap = new Object();
                pap.title = paper.title;
                pap.authors = paper.authors;
                pap.pdfurl = paper.pdfurl;
                options._titles.push(pap);            
            });
            
            namewithspace = options.name.replace(/_/, " ");
            speakerdiv = $("div[id=" + options.name + "]");
            //$("<h4/>", { "text": "Papers by " + namewithspace + ":" }).appendTo(speakerdiv);
            $("<div/>", { "text": "Current speaker: " + namewithspace, "id": "curspeaker"}).appendTo(speakerdiv);
            thesepapers = $("<ul/>", { "class": "papers" }).appendTo(speakerdiv);
            for(var i in options._titles) {
                thispaper = $("<li/>", { "id": options.name + i }).appendTo(thesepapers);
                linkcode = "getPdf('" + options._titles[i].pdfurl + "')";
                
                if (options._titles[i].pdfurl){
                    $("<span/>", {"onClick": linkcode, "text": options._titles[i].title, "class": "papertitle", "title": "Click to read in paper viewer"   }).appendTo(thispaper);
                    $("<a/>", {"href": options._titles[i].pdfurl, "text": " [PDF]", "class": "pdf"}).appendTo(thispaper);
                } else {
                    $("<span/>", {  "text": options._titles[i].title, "class": "papertitle",    }).appendTo(thispaper);
                    $("<span/>", { "text": " No PDF found", "class": "papertitle", "style": "font-size: 8pt; text-decoration: none;"    }).appendTo(thispaper);
                }
                theseauthors = $("<ul/>", { "id": options.name + i + "authors"} ).appendTo(thispaper);
                for (var au in options._titles[i].authors){
                    if (options._titles[i].authors[au].length > 3){
                        $("<li/>", { "class": "authorlist", "text": options._titles[i].authors[au], "onClick": "getGraph('" + options._titles[i].authors[au] + "');", "title": "Click to load network diagram" }).appendTo(theseauthors);
                    }
                }
            }
        });	  
    } 


       // setup code, fire on initialization
       // options refers to the options passed into the plugin on init
       // this refers to the popcorn object
},
    start: function( event, options ){
    $("div[id=" + options.name + "]").show();
	//options._container.style.display = "inline";
       // fire on options.start
       // event refers to the event object
       // options refers to the options passed into the plugin on init
       // this refers to the popcorn object
    



    },
    end: function( event, options ){
       // fire on options.end
       // event refers to the event object
       // options refers to the options passed into the plugin on init
       // this refers to the popcorn object
     /*
      var $children = document.getElementById(options.target).children;

      if ( !!$children.length ) {
        Array.prototype.forEach.call( $children, function( obj, key) {
            obj.style.display = "none";
        });    
      }
      */
    $("div[id=" + options.name + "]").hide();
      //options._container.style.display = "none";

    }
  });
})(Popcorn);

