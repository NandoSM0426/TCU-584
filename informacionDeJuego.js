
var infoPrimeraPlagaOriginal = "En la emocionante misión del cañal 007, te enfrentarás a una astuta plaga que ha tomado la forma de una rata. Estos roedores traviesos se han infiltrado en tu cañal y solo tú, como agente secreto, puedes detenerlos. Equipado con tu poderoso rodenticida, activarás el modo 007 con un sigiloso toque en la tecla de espacio, la cual te otorgara 100 puntos. Prepárate para una emocionante batalla mientras persigues a estas criaturas, eliminando la amenaza para la seguridad de tu cañal y protegiendo el mundo de la dulzura. ¡La aventura está por comenzar, agente!";
var infoSegundaPlagaOriginal = "En esta emocionante misión en el cañal 007, descubrimos que la plaga de ratas no actúa sola. Los astutos jobotos, maestros del engaño, se revelan como los cerebros maquiavélicos detrás de esta operación. Estos compinches tramposos están conspirando para causar estragos en el mundo del cultivo de caña de azúcar. Pero, como agente secreto, estás decidido a desentrañar sus malvados planes. Con el Hongo Entomopatógeno que la agencia te facilito listo para la acción y el modo 007 activado con la tecla de W, demuestra tu destreza como agente secreto. Gana puntos 300, elimina amenazas y salva el mundo de la caña de azúcar! ¡La emoción está en su punto más alto, agente!";
var infoTerceraPlagaOriginal = "¡Prepárate para enfrentar la próxima amenaza en el cañal 007: el Poderoso Barrenador Gigante! Este gangster colosal, con astucia comparable a Kingpin, ha desatado el caos en el mundo de la caña de azúcar. Pero como agente secreto, estás listo para la acción. Cuando te encuentres con el temible Poderoso Barrenador Gigante, podrás deshacerte de él usando el Hongo entomopatógenoun activandolo con un rápido toque en la tecla 'E'. ¡Cada vez que logres eliminar a este titán, ganarás 500 puntos y te acercarás más a la victoria! Activa tu modo 007 con la tecla de espacio, utiliza tu astucia y derrota al Poderoso Barrenador Gigante para salvar el cañal y acumular impresionantes puntos en tu expediente como agente secreto. ¡Que comience la emocionante batalla, agente!";

var infoCuartaPlagaOriginal = "La temible Mosca Blanca emerge como el villano maestro, devastando los campos de melones con su astucia y destructivo apetito. Esta plaga incansable amenaza con arrasar todo a su paso, poniendo en peligro la deliciosa cosecha. Tu arma secreta para combatirla es el ingenioso 'Protocolo Lluvia', activado con la tecla E. Este dispositivo convierte la lluvia en una bala de agua letal que impacta contra la Mosca Blanca, otorgándote 500 puntos por cada precisión. Canaliza tu espíritu James Bond, utiliza tu astucia y asegúrate de que la lluvia sea tu aliada para salvar los melones y completar tu misión con éxito. ¡Buena suerte, Agente Melón!";
var infoQuintaPlagaOriginal = "El astuto Trips se erige como un villano destructivo que busca superar a la Mosca Blanca en su carrera de destrucción. Aunque sus planes a veces fallan, su habilidad para causar estragos sigue siendo una amenaza constante para los melones. Para contrarrestar al Trips, cuentas con el 'Dispositivo Chinche', activado con la tecla W. Este ingenioso proyectil, lanzado con precisión, impacta contra el Trips, otorgándote 300 puntos por cada acierto. Canaliza tu destreza James Bond, utiliza tu arsenal de chinches y asegúrate de frenar al Trips en su intento de superar a la Mosca Blanca. ¡La suerte está de tu lado, Agente Melón!";
var infoSextaPlagaOriginal = "El Minador de Hojas se presenta como una bomba de destrucción constante, aunque nunca alcanza el nivel de devastación de la Mosca Blanca y el Trips. A pesar de su menor amenaza, su persistencia lo convierte en un enemigo omnipresente para los melones. Para neutralizar al Minador de Hojas, cuentas con las ingeniosas 'Bombas Aspiradoras', activadas con la tecla de Espacio. Estas bombas, irónicamente efectivas para un minador, otorgan 100 puntos por cada exitoso despliegue. Canaliza tu ingenio James Bond, utiliza estas bombas para limpiar la plantación y asegurarte de que incluso el Minador de Hojas no pueda frenar tu misión. ¡Adelante, Agente Melón!";

var infoPrimeraPlagaActual = infoPrimeraPlagaOriginal;
var infoSegundaPlagaActual = infoSegundaPlagaOriginal;
var infoTerceraPlagaActual = infoTerceraPlagaOriginal;

var infoCuartaPlagaActual = infoCuartaPlagaOriginal;
var infoQuintaPlagaActual = infoQuintaPlagaOriginal;
var infoSextaPlagaActual = infoSextaPlagaOriginal;

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

    else if (plaga === 'cuartaPlaga') {

        if (infoCuartaPlagaActual !== infoCuartaPlagaOriginal) {

            document.getElementById("infoCuartaPlaga").innerText = infoCuartaPlagaOriginal;
            infoCuartaPlagaActual = infoCuartaPlagaOriginal;

        } else {

            document.getElementById("infoCuartaPlaga").innerText = "Información sobre  Cortadores: Nueva descripción aquí...";
            infoCuartaPlagaActual = "Información sobre  Cortadores: Nueva descripción aquí...";
        }
    }

    else if (plaga === 'quintaPlaga') {

        if (infoQuintaPlagaActual !== infoQuintaPlagaOriginal) {

            document.getElementById("infoQuintaPlaga").innerText = infoQuintaPlagaOriginal;
            infoQuintaPlagaActual = infoQuintaPlagaOriginal;

        } else {

            document.getElementById("infoQuintaPlaga").innerText = "Información sobre  Cortadores: Nueva descripción aquí...";
            infoQuintaPlagaActual = "Información sobre  Cortadores: Nueva descripción aquí...";
        }
    }

    else if (plaga === 'sextaPlaga') {

        if (infoSextaPlagaActual !== infoSextaPlagaOriginal) {

            document.getElementById("infoSextaPlaga").innerText = infoSextaPlagaOriginal;
            infoSextaPlagaActual = infoSextaPlagaOriginal;

        } else {

            document.getElementById("infoSextaPlaga").innerText = "Información sobre  Cortadores: Nueva descripción aquí...";
            infoSextaPlagaActual = "Información sobre  Cortadores: Nueva descripción aquí...";
        }
    }
}