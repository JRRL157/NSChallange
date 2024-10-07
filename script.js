// Guarantees the DOM is completely loaded!
document.addEventListener('DOMContentLoaded', function() {
    
    var map = L.map('map').setView([-2.877390, -54.539490], 5);

    // Adicionando o mapa base do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // New layer for the circles
    var circleLayer = L.layerGroup().addTo(map);


    // Sliders
    var yearSlider = document.getElementById('yearSlider');
    var monthSlider = document.getElementById('monthSlider');
    var daySlider = document.getElementById('daySlider');

    // Selects
    var stateSelect = document.getElementById('stateSelect');
    
    var selectedDate = document.getElementById('selectedDate');

     function loadData() {
        circleLayer.clearLayers();

        Papa.parse('datasets/INPE/Focos/focos_' + yearSlider.value + '_big' + '.csv', {
            download: true,
            header: true, 
            complete: function(results) {                                

                results.data.forEach(function(row) {
                    if (parseInt(row.mes) !== parseInt(monthSlider.value) || parseInt(row.dia) !== parseInt(daySlider.value)  || (stateSelect.value !== "" && row.estado !== stateSelect.value)) {
                        return;
                    }                    
                    
                    var circle = L.circle([row.lat, row.lon], {
                        color: 'red',       
                        fillColor: 'red',   
                        fillOpacity: 0.2,   
                        radius: 1           
                    });

                    circleLayer.addLayer(circle);
                });
            }
        });
    }

    function updateDate() {
        selectedDate.innerHTML = yearSlider.value + " - " + ('0' + monthSlider.value).slice(-2) + " - " + daySlider.value;
    }

    function updateMap() {
        loadData(); 
    }

    // Adicionar event listeners para os sliders
    yearSlider.addEventListener('input', function() {
        updateDate();
        updateMap();
    });

    monthSlider.addEventListener('input', function() {
        updateDate();
        updateMap();
    });

    daySlider.addEventListener('input', function() {
        updateDate();
        updateMap();
    });
    
    stateSelect.addEventListener('change', loadData);

});
