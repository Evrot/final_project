document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("myForm");
    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("formContent");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        
        var formData = new FormData(form);
        var data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });

        
        modalContent.innerHTML = "";
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var div = document.createElement("div");
                div.textContent = key + ": " + data[key];
                modalContent.appendChild(div);
            }
        }

        
        modal.style.display = "block";
    });

    
    var closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    
    var confirmBtn = document.getElementById("confirmBtn");
    confirmBtn.onclick = function() {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
    
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                modal.style.display = "none";
            }
        });
    
        xhr.open('POST', 'https://rapidmail.p.rapidapi.com/');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.setRequestHeader('X-RapidAPI-Key', 'e55b3f5141mshdaa8e8fbc6f6f82p14beffjsn488a31924ff1');
        xhr.setRequestHeader('X-RapidAPI-Host', 'rapidmail.p.rapidapi.com');
    
        const formData = new FormData(form);
        const data = JSON.stringify({
            ishtml: 'false',
            sendto: formData.get('E-mail'), 
            name: formData.get('Name'), 
            replyTo: "",
            title: "New Journey!",
            body: 
            "Congratulations, you have been approved and are now a volunteer! Your volunteering will take place on April 21st at 8am CST."
            
        });
    
        xhr.send(data);
    }});
