import { NbMenuItem } from '@nebular/theme';
import { MenuItem } from 'app/@theme/custom-nebular/menu-item';

export const MENU_ITEMS: MenuItem[] = [

  {
    title: 'Tableau de bord (V1.1)',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    key: 'bord',

  },

  {
    title: 'Capteurs',
    icon: 'shake-outline',
    link: '/pages/capteurs',
    key: 'capteurs',

  },
  {
    title: 'Maps',
    icon: 'book-open-outline',
    group: true,

    //link: '/pages/newMaps',
  },
  {
    title: 'Module de conseils',
    icon: 'award-outline',
    // group: true,
    children: [
      {
        title: 'Évapotranspiration',
        link: '',
        icon: { icon: 'ruler', pack: 'fa' },
        key: 'evapotranspiration',
        children: [
          {
            title: 'ET₀ (De référence)',
            link: '/pages/evapo',
            group: true,
            icon: { icon: 'angle-right', pack: 'fa' },

          },
          //  {
          //   title: 'ETc Spaciale (Des cultures)',
          //   icon: { icon: 'angle-right', pack: 'fa' },
          //
          //    // link: '/pages/evapoSim',

          // }
        ]
      },
      {
        title: 'Irrigation',

        icon: { icon: 'cubes', pack: 'fas' },
        key: 'irrigation',
        group: true,
      },
      {
        title: 'Fertilisation',

        icon: { icon: 'diagnoses', pack: 'fas' },
        key: 'fertilisation',
        group: true,
      },

    ],
  },
  {
    title: 'AGRO-IOT',
    icon: 'bulb-outline',
    children: [

      {
        title: 'Table et data',
        icon: 'cube-outline',
        link: '/pages/tables/temperature',
        group: true,
        key: 'tableetdata',
      },
      {
        title: 'Notification',
        icon: 'alert-circle-outline',
        group: true,
        key: 'notification',
      },
      {
        title: 'Alerts',
        icon: 'alert-triangle-outline',
        link: '/pages/alertes',
        group: true,
        key: 'alerts',

      },
    ],

  },
  {
    title: 'AGRO-SAT',
    icon: 'compass-outline',

    children: [
      {
        title: 'ETc evapotranspiration spaciale (Des cultures)',
        icon: { icon: 'angle-right', pack: 'fa' },
        group: true,
        // link: '/pages/evapoSim',


      },
      {

        title: 'Agro surveillance',
        icon: 'monitor-outline',
        // group: true,
        children: [
          {
            title: 'Imagerie satellitaire',
            // link: '/pages/Agro-monitoring/Monitoring',
            group: true,
            icon: { icon: 'camera-retro', pack: 'fa' },
            key: 'imageriesatellitaire',
          },
          {
            title: 'Météo du sol',
            // link: '/pages/Agro-monitoring/soilData',
            group: true,
            icon: { icon: 'seedling', pack: 'fa' },
            key: 'meteodusol',
          },


        ],

      },
    ],

  },

  // {
  //   title: 'Table et data',
  //   icon: 'cube-outline',
  //   link: '/pages/tables/temperature',
  //
  // }, 

  // {
  //   title: 'Maps',
  //   icon: 'book-open-outline',
  //
  //   //link: '/pages/newMaps',
  // },

  // {
  //   title: 'Module de conseils',
  //   icon: 'award-outline',
  //   // group: true,
  //   children: [
  //     {
  //       title: 'Évapotranspiration',
  //       link: '',
  //       icon: { icon: 'ruler', pack: 'fa' },
  //       children: [
  //         {
  //           title: 'ET₀ (De référence)',
  //           link: '/pages/evapo',
  //           icon: { icon: 'angle-right', pack: 'fa' },

  //         }, {
  //           title: 'ETc Spaciale (Des cultures)',
  //           icon: { icon: 'angle-right', pack: 'fa' },
  //             link: '/pages/evapoSim',

  //         }
  //       ]
  //     },
  //     {
  //       title: 'Irrigation',
  //    
  //       icon: { icon: 'cubes', pack: 'fas' },
  //     },
  //     {
  //       title: 'Fertilisation',
  //    
  //       icon: { icon: 'diagnoses', pack: 'fas' },
  //     },

  //   ],
  // },
  // {
  //   title: 'Notification',
  //   icon: 'alert-circle-outline',
  //
  // },
  // {
  //   title: 'Alerts',
  //   icon: 'alert-triangle-outline',
  //   link: '/pages/alertes',
  //

  // },
  // {

  //   title: 'Agro surveillance',
  //   icon: 'monitor-outline',
  //   // group: true,
  //   children: [
  //     {
  //       title: 'Imagerie satellitaire',
  //       link: '/pages/Agro-monitoring/Monitoring',
  //       icon: { icon: 'camera-retro', pack: 'fa' },
  //     },
  //     {
  //       title: 'Météo du sol',
  //       link: '/pages/Agro-monitoring/soilData',
  //       icon: { icon: 'seedling', pack: 'fa' },
  //     },


  //   ],

  // },
  // {
  //   title: 'Notification',
  //   icon: 'alert-circle-outline',
  //
  // },
  // {
  //   title: 'Alerts',
  //   icon: 'alert-triangle-outline',
  //   link: '/pages/alertes',
  //

  // },
  {
    title: 'Informations utiles',
    icon: 'checkmark-circle-outline',
    link: '/pages/InformationUtiles/Dashboard',
    key: 'informationsutils',
  },
  {
    title: 'Administration',
    icon: 'award-outline',
    link: '/pages/Adminstrator/Dashboard',
    key: 'administration',
  },
];