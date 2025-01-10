import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'; @Injectable({ providedIn: 'root' })


export class Alertas {

    constructor() { }


    openLoading() {
        if (!Swal.isVisible()) {
            Swal.fire({
                title: "Proceso en ejecución",
                text: "Por favor espere",
                imageUrl: "assets/img/805.gif",
                imageWidth: 80,
                imageHeight: 80,
                showConfirmButton: false,
                allowOutsideClick: false
            });
        }
        else {
            Swal.close();
            Swal.fire({
                title: "Proceso en ejecución",
                text: "Por favor espere",
                imageUrl: "assets/img/805.gif",
                imageWidth: 80,
                imageHeight: 80,
                showConfirmButton: false,
                allowOutsideClick: false
            });
        }
    }



    openError(message: string) {
        Swal.fire({
            text: message,
            icon: 'error',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
        });
    }


    warning(message: string) {
        Swal.fire({
            html: message,
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
            confirmButtonColor: '#1A9BAF'
        });
    }

    closeLoading() {
        Swal.close();
    }
}