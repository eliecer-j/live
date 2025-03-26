                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidmttZWtkamJhcHR0c2V5cnB4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjYxNjU4MywiZXhwIjoyMDU4MTkyNTgzfQ.vAWWknSAq4pHIuIlisyJzH8cOGQw44ceGsDxBDprp3w', "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidmttZWtkamJhcHR0c2V5cnB4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjYxNjU4MywiZXhwIjoyMDU4MTkyNTgzfQ.vAWWknSAq4pHIuIlisyJzH8cOGQw44ceGsDxBDprp3w" }


function update_hora(){
  let h = new Date();
  let hora =  parseInt(h.getHours().toString())
  return hora
}

setInterval(update_hora(), 1000)


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
fetch(`https://wbvkmekdjbapttseyrpx.supabase.co/rest/v1/data_futbol?order=time.asc`, { headers })
    .then(response => response.json())
    .then(data => {
        console.log(data.length);
        
        console.log(h, hora)
        console.log(2 + 2)
        arr = data
        if (data.length === 0) {  // Verificamos si no hay datos
            document.querySelector('.events-list').innerHTML = `
                <div class="notification is-danger">
                    No hay eventos que mostrar. Por favor, intente más tarde.
                </div>
            `;
            return;
        }
        
        const eventsList = document.querySelector('.events-list');
        // Limpiar la lista actual
        eventsList.innerHTML = '';

       
        
        
        // Mostrar cada evento
        data.forEach(evento => {

        
            
            const eventHtml = `
                <a onclick="data_id(${evento.id})">
                <div class="box py-2 px-3 mb-1 has-background-dark" style="border-radius: 2px; margin-top: 0.5rem;">
                    <div class="columns is-vcentered is-mobile m-0">
                        <div class="column is-narrow has-text-weight-bold is-size-6 has-text-white" style="min-width: 45px; padding: 0 0.75rem 0 0;">
                            ${evento.time || '--:--'}
                        </div>
                        <div class="column" style="border-left: 1px solid #484848; padding: 0.25rem 0.75rem;">
                            <h3 class="is-size-7 has-text-weight-medium has-text-white" style="line-height: 1.2;">
                                ${evento.title || 'Evento deportivo'}
                            </h3>
                            <div class="tags are-small mb-0 mt-1" style="gap: 0.25rem;">
                            ${evento.category == 'Fútbol' || evento.title.includes('Clasificación') 
                              || evento.title.includes('Eliminatorias') ? `
                                
                                <span class="tag is-info is-small py-0" 
                                    style="height: 1.25em; 
                                           font-size: 0.65rem;
                                           background:rgb(14, 151, 26) !important;
                                           color: white;
                                           font-weight: 350;
                                           letter-spacing: 0.2px;
                                           box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                                    ${evento.category}
                                </span>
                                
                                ` : `<span class="tag is-info is-small py-0" 
                                style="height: 1.25em; 
                                       font-size: 0.65rem;
                                       background:rgb(46, 6, 192) !important;
                                       color: white;
                                       font-weight: 350;
                                       letter-spacing: 0.2px;
                                       box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                                ${evento.category}
                            </span> 
                            
                                    `}
                                ${parseInt(evento.time) == update_hora() || parseInt(evento.time) + 1 == update_hora() 
                                    || parseInt(evento.time) + 2 == update_hora() ? `
                                    <span class="tag is-danger is-small py-0" 
                                        style="height: 1.25em; 
                                               font-size: 0.65rem;
                                               background: #ff3860 !important;
                                               font-weight: 500;
                                               letter-spacing: 0.2px;
                                               box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                                        <span class="icon is-small mr-1" style="margin-right: 0.15rem !important;">
                                            <i class="fas fa-circle fa-xs" style="animation: pulse 2s infinite;"></i>
                                        </span>
                                        <span style="position: relative; top: -0.5px;">LIVE</span>
                                    </span>
                                ` : ''}
                            </div>
                        </div>
                        <div class="column is-narrow pl-2">
                            <button class="button is-small is-info" 
                                style="height: 1.5em; width: 1.5em; padding: 0; background: #485fc7;">
                                <span class="icon is-small">
                                    <i class="fas fa-play fa-xs has-text-white"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                </a>
            `;
            eventsList.innerHTML += eventHtml;
        });

    })
    .catch(error => {
        console.error('Error:', error);
        document.querySelector('.events-list').innerHTML = `
            <div class="notification is-danger">
                error en el server, <br>
                papí se cayo esa vaina. Por favor, intente más tarde.
            </div>
        `;
    });


function data_id(v){
    sessionStorage.setItem("data", JSON.stringify(arr));
    window.location.href = `live.html?v=${v}`
        
    }


