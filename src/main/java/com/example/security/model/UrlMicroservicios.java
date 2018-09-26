package com.example.security.model;

public enum UrlMicroservicios {


        MS_EMPLEADO{
            public String toString(){
                return "http://ms-empleado/api/veedor/";
            }
        },
        MS_NEW_EMPLEADOS {
            public String toString() {
            return "http://ms-empleado/api/admin/create";
        }
        },
        MS_EMPLEADOS {
            public String toString() {
              return "http://ms-empleado/api/veedor/employees";
            }
        },
        MS_EMPLEADOS_UPDATE {
            public String toString() {
                return "http://ms-empleado/api/admin/update";
            }
        },
        MS_EMPLEADOS_DELETE {
            public String toString() {
                return "http://ms-empleado/api/admin/delete";
            }
        },
        MS_EMPLEADOS_PERMANENT_DELETE {
            public String toString() {
                return "http://ms-empleado/api/admin/permanentDelete";
            }
        }
}
