import { useParticipanteService } from './useParticipanteService';

export const useParticipanteValidation = () => {
    const { checkMailExists } = useParticipanteService();

    const validateNombre = (value, errors) => {
        if (!value || value.trim() === '') {
            errors.nombre = 'El nombre es obligatorio';
            return false;
        } else if (value.length < 2) {
            errors.nombre = 'El nombre debe tener al menos 2 caracteres';
            return false;
        } else {
            errors.nombre = null;
            return true;
        }
    };

    const validateApellido = (value, errors) => {
        if (!value || value.trim() === '') {
            errors.apellido = 'El apellido es obligatorio';
            return false;
        } else if (value.length < 2) {
            errors.apellido = 'El apellido debe tener al menos 2 caracteres';
            return false;
        } else {
            errors.apellido = null;
            return true;
        }
    };

    const validateTelefono = (value, errors) => {
        if (!value || value.trim() === '') {
            errors.telefono = 'El teléfono es obligatorio';
            return false;
        } else if (!/^\d{7,15}$/.test(value.replace(/\D/g, ''))) {
            errors.telefono = 'El teléfono debe tener entre 7 y 15 dígitos';
            return false;
        } else {
            errors.telefono = null;
            return true;
        }
    };

    const validateMail = async (value, errors, checkDuplicate = true) => {
        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value || value.trim() === '') {
            errors.mail = 'El mail es obligatorio';
            return false;
        } else if (!mailRegex.test(value)) {
            errors.mail = 'El mail no es válido';
            return false;
        }

        if (checkDuplicate) {
            const exists = await checkMailExists(value.trim().toLowerCase());
            if (exists) {
                errors.mail = 'Este mail ya está registrado';
                return false;
            }
        }

        errors.mail = null;
        return true;
    };

    const validateCiudad = (value, errors) => {
        if (!value) {
            errors.ciudad = 'Debe seleccionar una ciudad';
            return false;
        } else {
            errors.ciudad = null;
            return true;
        }
    };

    const validateOficio = (value, errors) => {
        if (!value) {
            errors.oficio = 'Debe seleccionar un oficio';
            return false;
        } else {
            errors.oficio = null;
            return true;
        }
    };

    const validateTerminos = (value, errors) => {
        if (!value) {
            errors.terminos = 'Debe aceptar los términos y condiciones';
            return false;
        } else {
            errors.terminos = null;
            return true;
        }
    };

    const validateForm = async (form, errors, checkMailDuplicate = true) => {
        const validNombre = validateNombre(form.nombre, errors);
        const validApellido = validateApellido(form.apellido, errors);
        const validCiudad = validateCiudad(form.ciudad, errors);
        const validTelefono = validateTelefono(form.telefono, errors);
        const validMail = await validateMail(form.mail, errors, checkMailDuplicate);
        const validOficio = validateOficio(form.oficio, errors);
        const validTerminos = validateTerminos(form.terminos, errors);

        return validNombre && validApellido && validCiudad &&
            validTelefono && validMail && validOficio && validTerminos;
    };

    const clearErrors = (errors) => {
        errors.nombre = null;
        errors.apellido = null;
        errors.ciudad = null;
        errors.telefono = null;
        errors.mail = null;
        errors.oficio = null;
        errors.terminos = null;
    };

    return {
        validateNombre,
        validateApellido,
        validateCiudad,
        validateTelefono,
        validateMail,
        validateOficio,
        validateTerminos,
        validateForm,
        clearErrors
    };
};