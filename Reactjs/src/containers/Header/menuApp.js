export const adminMenu = [
    { //Quan ly nguoi dung
        //name  là menu cha  lớp 0
        name: 'menu.admin.manage-user', menus: [


            {
                //name này là con cả lớp 1
                name: 'menu.admin.crud',link: '/system/user-redux'
                
            },

            {
                //name này là con cả lớp 1
                name: 'menu.admin.crud-redux',link: '/system/user-manage'
                
            },

            {
                //name này là con cả lớp 1
                name: 'menu.admin.manage-doctor', link:'/system/manage-doctor'
                //submenu là menu con hai lớp2
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //        ]
            },

            // {
            //     //name này là con cả lớp 1
            //     name: 'menu.admin.manage-admin',link: '/system/user-admin'
                
            // },
            { //Quan ly ke  hoach  kham benh cua bac si
        
              
                    
                        //name này là con cả lớp 1
                        name: 'menu.admin.schedule',link: '/doctor/manage-schedule'
                        
                    
                        
            }
        ]
        
           
    },

    // { // quan ly phong kham
    //     //name  là menu cha  lớp 0
    //     name: 'menu.admin.clinic', menus: [


    //         {
    //             //name này là con cả lớp 1
    //             name: 'menu.admin.manage-clinic',link: '/system/manage-linic'
                
    //         },



    //             ]
    // },

    { // quản lý Chuyên Khoa
        //name  là menu cha  lớp 0
        name: 'menu.admin.speacialty', menus: [


            {
                //name này là con cả lớp 1
                name: 'menu.admin.manage-speacialty',link: '/system/manage-speacialty'
                
            },



                ]
    },
];

// code duoi day la menu cua doctor
export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus:[
            { //Quan ly ke  hoach  kham benh cua bac si
                        //name này là con cả lớp 1
                        name: 'menu.doctor.manage-schedule',link: '/doctor/doctor-schedule'              
            },
            { //Quan ly benh nhan cua bac si
                //name này là con cả lớp 1
                name: 'menu.doctor.manage-patient',link: '/doctor/manage-patient'              
            },
        ]
    }
];








        
        
                  
        
        
                       
            
        

       
        

   
   
  




