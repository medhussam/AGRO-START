/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

//declare var tinymce: any;

declare var echarts: any;


import * as L from 'leaflet';
declare module 'leaflet' {
    namespace control {
       function fullscreen(v: any);
    }
    namespace control {
        function browserPrint(options?: any): Control.BrowserPrint;
    }
    namespace Control {
        interface BrowserPrint {
          addTo(map: L.Map): any;
        }
    }
    namespace control {
        function coordinates(v: any);
    }

}

