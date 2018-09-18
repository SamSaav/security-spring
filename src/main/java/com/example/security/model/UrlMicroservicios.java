package com.example.security.model;

public enum UrlMicroservicios {

        MS_NEW_EMPLEADOS {
            public String toString() {
            return "http://ms-empleado/";
        }
        },
        MS_EMPLEADOS {
            public String toString() {
              return "http://ms-empleado/employees";
            }
        },
        MS_EMPLEADOS_ACTIVE {
            public String toString() {
                return "http://ms-empleado/active";
            }
        },
        MS_EMPLEADOS_HIDEN {
            public String toString() {
                return "http://ms-empleado/hiden";
            }
        },
        MS_EMPLEADOS_UPDATE {
            public String toString() {
                return "http://ms-empleado/update";
            }
        },
        MS_EMPLEADOS_DELETE {
            public String toString() {
                return "http://ms-empleado/delete";
            }
        },
        MS_EMPLEADOS_PERMANENT_DELETE {
            public String toString() {
                return "http://ms-empleado/permanentDelete";
            }
        }
}
