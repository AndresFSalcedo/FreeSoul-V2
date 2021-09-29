import React from 'react';
import '../../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Buzos from '../../../FreesoulDocs/FotosProductos/Buzos/MiCuerpoMiDecision(Neon)/DAV_4815-1.jpg';
import Camisetas from '../../../FreesoulDocs/FotosProductos/Camisetas/BoobsA/DAV_5111.jpg';
import NuevoProducto from '../../../FreesoulDocs/FotosProductos/Buzos/DeCaminoACasa(Lila)/IMG_7295.jpg';

export default function HomeBody(){

    return(
        <div className="mt-5 bChurrusco">

            <div className="row">
                <div className="col-6">
                    <div className="picHome">
                        <img 
                            src={Buzos}
                            alt="Buzos"
                        />
                    </div>  
                </div>                
                <div className="col-6">
                    <div className="picHome">
                        <img 
                            src={Camisetas}
                            alt="Buzos"
                        />
                    </div>  
                </div>  
            </div>

            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="picHome">
                        <img 
                            src={NuevoProducto}
                            alt="Buzos"
                        />
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}