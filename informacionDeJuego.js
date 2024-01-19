
var infoPrimeraPlagaOriginal = "En la emocionante misión del cañal 007, te enfrentarás a una astuta plaga que ha tomado la forma de una rata. Estos roedores traviesos se han infiltrado en tu cañal y solo tú, como agente secreto, puedes detenerlos. Equipado con tu poderoso rodenticida, activarás el modo 007 con un sigiloso toque en la tecla de espacio, la cual te otorgara 100 puntos. Prepárate para una emocionante batalla mientras persigues a estas criaturas, eliminando la amenaza para la seguridad de tu cañal y protegiendo el mundo de la dulzura. ¡La aventura está por comenzar, agente!";
var infoSegundaPlagaOriginal = "En esta emocionante misión en el cañal 007, descubrimos que la plaga de ratas no actúa sola. Los astutos jobotos, maestros del engaño, se revelan como los cerebros maquiavélicos detrás de esta operación. Estos compinches tramposos están conspirando para causar estragos en el mundo del cultivo de caña de azúcar. Pero, como agente secreto, estás decidido a desentrañar sus malvados planes. Con el Hongo Entomopatógeno que la agencia te facilito listo para la acción y el modo 007 activado con la tecla de W, demuestra tu destreza como agente secreto. Gana puntos 300, elimina amenazas y salva el mundo de la caña de azúcar! ¡La emoción está en su punto más alto, agente!";
var infoTerceraPlagaOriginal = "¡Prepárate para enfrentar la próxima amenaza en el cañal 007: el Poderoso Barrenador Gigante! Este gangster colosal, con astucia comparable a Kingpin, ha desatado el caos en el mundo de la caña de azúcar. Pero como agente secreto, estás listo para la acción. Cuando te encuentres con el temible Poderoso Barrenador Gigante, podrás deshacerte de él usando el Hongo entomopatógenoun activandolo con un rápido toque en la tecla 'E'. ¡Cada vez que logres eliminar a este titán, ganarás 500 puntos y te acercarás más a la victoria! Activa tu modo 007 con la tecla de espacio, utiliza tu astucia y derrota al Poderoso Barrenador Gigante para salvar el cañal y acumular impresionantes puntos en tu expediente como agente secreto. ¡Que comience la emocionante batalla, agente!";

var infoPrimeraPlagaActual = infoPrimeraPlagaOriginal;
var infoSegundaPlagaActual = infoSegundaPlagaOriginal;
var infoTerceraPlagaActual = infoTerceraPlagaOriginal;

function mostrarInformacion(plaga) {

    if (plaga === 'primeraPlaga') {

        if (infoPrimeraPlagaActual !== infoPrimeraPlagaOriginal) {

            document.getElementById("infoPrimeraPlaga").innerText = infoPrimeraPlagaOriginal;
            infoPrimeraPlagaActual = infoPrimeraPlagaOriginal;

        } else {


            document.getElementById("infoPrimeraPlaga").innerText = "Información sobre Pulgones: Nueva descripción aquí...";
            infoPrimeraPlagaActual = "Información sobre Pulgones: Nueva descripción aquí...";

        }

    } else if (plaga === 'segundaPlaga') {

        if (infoSegundaPlagaActual !== infoSegundaPlagaOriginal) {

            document.getElementById("infoSegundaPlaga").innerText = infoSegundaPlagaOriginal;
            infoSegundaPlagaActual = infoSegundaPlagaOriginal;

        } else {


            document.getElementById("infoSegundaPlaga").innerText = "Información sobre Gusanos Cortadores: Nueva descripción aquí...";
            infoSegundaPlagaActual = "Información sobre Gusanos Cortadores: Nueva descripción aquí...";
        }
    }

    else if (plaga === 'terceraPlaga') {

        if (infoTerceraPlagaActual !== infoTerceraPlagaOriginal) {

            document.getElementById("infoTerceraPlaga").innerText = infoTerceraPlagaOriginal;
            infoTerceraPlagaActual = infoTerceraPlagaOriginal;

        } else {

            document.getElementById("infoTerceraPlaga").innerText = "Información sobre  Cortadores: Nueva descripción aquí...";
            infoTerceraPlagaActual = "Información sobre  Cortadores: Nueva descripción aquí...";
        }
    }
}