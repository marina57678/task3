import * as yup from 'yup';

export const createNoteSchema = yup.object().shape({
name: yup
   .string()
   .required(),
	content: yup
	.string()
	.min(4)
   .required(),
	type: yup
	.string()
	.required()
	// .matches(/(idea|random|task)/)
});


