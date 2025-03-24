const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidmttZWtkamJhcHR0c2V5cnB4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjYxNjU4MywiZXhwIjoyMDU4MTkyNTgzfQ.vAWWknSAq4pHIuIlisyJzH8cOGQw44ceGsDxBDprp3w', "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidmttZWtkamJhcHR0c2V5cnB4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjYxNjU4MywiZXhwIjoyMDU4MTkyNTgzfQ.vAWWknSAq4pHIuIlisyJzH8cOGQw44ceGsDxBDprp3w" }
const today = new Date().toISOString().split("T")[0]; // Obtiene YYYY-MM-DD
const tomorrow = new Date();

let arr = []
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split("T")[0];
fetch(`https://wbvkmekdjbapttseyrpx.supabase.co/rest/v1/data_futbol?created_at=gte.${today}&created_at=lt.${tomorrowStr}&order=time.asc`, { headers })
    .then(response => response.json())
    .then(data => {
        console.log(data.length);
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
                            ${evento.category == 'Fútbol' || evento.title.includes('Clasificación') ? `
                                
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
                                ${evento.islive ? `
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

        // Después de renderizar los eventos, agregar contenido SEO
        eventsList.innerHTML += `
            <div class="mt-6 py-4" style="border-top: 1px solid #363636;">
                <div class="content has-text-grey-lighter" style="font-size: 0.9rem;">
                    <h2 class="title is-5 has-text-white-ter mb-3">TodoFutbol HD ⚽️</h2>
                    <h2 class="title is-5 has-text-white-ter mb-3">Fútbol en Vivo y Deportes Online 2024</h2>
                    
                    <div class="columns">
                        <div class="column">
                            <h3 class="subtitle is-6 has-text-grey-lighter mb-2">Transmisiones Deportivas en Directo</h3>
                            <p class="has-text-grey mb-3">
                                Disfruta de los mejores eventos deportivos en vivo, incluyendo LaLiga, Premier League, Champions League, 
                                Copa Libertadores y más competiciones internacionales. Transmisiones HD sin cortes.
                            </p>
                            
                            <div class="tags">
                                <span class="tag is-dark">Fútbol en Vivo</span>
                                <span class="tag is-dark">Deportes Online</span>
                                <span class="tag is-dark">Streaming Deportivo</span>
                                <span class="tag is-dark">Partidos en Directo</span>
                                <span class="tag is-dark">Ver Fútbol Gratis</span>
                                <span class="tag is-dark">Live Sports</span>
                            </div>
                        </div>
                        
                        <div class="column">
                            <h3 class="subtitle is-6 has-text-grey-lighter mb-2">Ligas y Torneos Destacados</h3>
                            <ul style="color: #b5b5b5; font-size: 0.85rem;">
                                <li>🏆 UEFA Champions League</li>
                                <li>⚽ LaLiga EA Sports</li>
                                <li>🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League</li>
                                <li>🇮🇹 Serie A TIM</li>
                                <li>🇫🇷 Ligue 1</li>
                                <li>🌎 Copa Libertadores</li>
                                <li>🌍 Mundial de Clubes</li>
                            </ul>
                        </div>
                    </div>

                    <div class="columns mt-4">
                        <div class="column">
                            <h3 class="subtitle is-6 has-text-grey-lighter mb-2">Características del Servicio</h3>
                            <ul style="color: #b5b5b5; font-size: 0.85rem;">
                                <li>📺 Calidad HD garantizada</li>
                                <li>🔄 Actualización en tiempo real</li>
                                <li>📱 Multi-dispositivo (PC, móvil, tablet)</li>
                                <li>⚡ Streams sin lag ni cortes</li>
                                <li>🌐 Disponible en toda Latinoamérica</li>
                            </ul>
                        </div>
                        
                        <div class="column">
                            <h3 class="subtitle is-6 has-text-grey-lighter mb-2">Equipos Populares</h3>
                            <div class="tags" style="gap: 0.3rem;">
                                <span class="tag is-dark is-small">Real Madrid</span>
                                <span class="tag is-dark is-small">Barcelona</span>
                                <span class="tag is-dark is-small">Manchester City</span>
                                <span class="tag is-dark is-small">PSG</span>
                                <span class="tag is-dark is-small">Bayern Munich</span>
                                <span class="tag is-dark is-small">Liverpool</span>
                                <span class="tag is-dark is-small">Inter Miami</span>
                            </div>
                        </div>
                    </div>

                    <article class="message is-dark mt-4">
                        <div class="message-body has-text-grey-lighter" style="background: #1a1a1a; border-color: #363636;">
                            <h4 class="subtitle is-6 has-text-grey-lighter mb-2">¿Por qué elegir nuestra plataforma?</h4>
                            <p class="has-text-grey is-size-7">
                                Ofrecemos la mejor experiencia para ver fútbol online y deportes en vivo. Nuestra plataforma 
                                garantiza transmisiones de alta calidad, con múltiples servidores y opciones de streaming. 
                                Disfruta de los partidos más importantes de las mejores ligas del mundo, comentarios en 
                                español latino y estadísticas en tiempo real.
                            </p>
                        </div>
                    </article>

                    <footer class="mt-4">
                        <p class="has-text-grey is-size-7">
                            Todos los partidos de fútbol en vivo, eventos deportivos, y competiciones internacionales 
                            actualizados diariamente. Programación completa de LaLiga, Champions League, Premier League, 
                            Serie A, Bundesliga, y más. Ver fútbol online nunca fue tan fácil.
                        </p>
                        <div class="tags mt-2">
                            <span class="tag is-dark is-small">Fútbol HD</span>
                            <span class="tag is-dark is-small">Streaming Deportivo</span>
                            <span class="tag is-dark is-small">Live Football</span>
                            <span class="tag is-dark is-small">Soccer Streams</span>
                            <span class="tag is-dark is-small">Ver Partidos Online</span>
                        </div>
                    </footer>
                </div>
            </div>
        `;
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
    window.location.href = `live.html?v=${v}`;
        
    }


