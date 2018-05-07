export const autocomplete = function autocomplete(inp, arr, callback) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      // console.log("e")
      // console.log(this.value)
      var email = this.value.split(" ").pop();
      // console.log("email")
      // console.log(email)

      var a, b, i, y, t, j, val = email;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      var ar = []
      var g = []
      var q = []
      var array= []
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        var sub = arr[i].value
        if (sub.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
          
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + sub.substr(0, val.length) + "</strong>";
          b.innerHTML += sub.substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + sub + "'>";
          b.addEventListener("click", function(e) {
              // inp.value = ''
              y = document.createElement("span");
              y.setAttribute("id", this.getElementsByTagName("input")[0].value);
              y.setAttribute("class", "mytagclass");
              t = document.createTextNode(this.getElementsByTagName("input")[0].value);
              y.appendChild(t);
              y.appendChild(j)
              document.getElementById('autocomplete_div').appendChild(y);
              // console.log(document.getElementsByClassName("myliclass").length)
              var len = document.getElementsByClassName("mytagclass")
              for(var l =0; l<len.length; l++){
                // console.log("len[l].id")
                // console.log(len[l].id)
                ar.push(len[l].id + " ")
                // g.push(len[l].id)
                for (var z = 0; z < arr.length; z++) {
                  if(arr[z].value === len[l].id){
                      console.log("ya")
                      console.log(arr[z].value)
                      console.log(len[l].id)
                      g.push(arr[z])
                  }
                }
              }
              var m = ar.join(" ");
              // inp.value = m
              // Set the cursor position of the "#myInput" element to the end when the page loads
              var input = document.getElementById('myInput');
              var len = m.length+10
              setCaretPosition(input, len);
              callback(true, g);
              
              
              closeAllLists();
          });
          j = document.createElement("SPAN");
          j.addEventListener("click", function(e) {
            document.getElementById('autocomplete_div').removeChild(y);
            // console.log("y.id")
            // console.log(y.id)
            // console.log(array)
            // console.log(document.getElementsByClassName("myliclass").length)
            var len = document.getElementsByClassName("mytagclass")
            for(var l =0; l<len.length; l++){
              // console.log("len[l].id")
              // console.log(len[l].id)
              array.push(len[l].id + " ")
              
              for (var z = 0; z < arr.length; z++) {
                  if(arr[z].value === len[l].id){
                      console.log("ya")
                      console.log(arr[z].value)
                      console.log(len[l].id)
                      q.push(arr[z])
                  }
                }
            }
            removeItem(array, y.id+ " ");
            removeItem(q, y.id);
            var m = array.join(" ");
            // inp.value = m
            // Set the cursor position of the "#myInput" element to the end when the page loads
            var input = document.getElementById('myInput');
            var len = m.length+10
            setCaretPosition(input, len);
            callback(true, q);
          });


          a.appendChild(b);
        }
      }

  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode === 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode === 38) { 
        currentFocus--;
        addActive(x);
      } else if (e.keyCode === 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          // console.log("currentFocus")
          // console.log(x)
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    // console.log("removeActive")
    // console.log(x)
    for (var i = 0; i < x.length; i++) {
      // console.log("x[i]")
      // console.log(x[i])
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  function removeItem(array, item){
    for(var i in array){
        if(array[i]===item){
            array.splice(i,1);
            break;
        }
    }
  }
  function setCaretPosition(ctrl, pos) {
    // Modern browsers
    console.log("ctrl")
    console.log(ctrl)
    console.log("pos")
    console.log(pos)
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    
    // IE8 and below
    } else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  document.addEventListener("click", function (e) {
      // console.log("e.target")
      // console.log(e.target)
      closeAllLists(e.target);
      });
}