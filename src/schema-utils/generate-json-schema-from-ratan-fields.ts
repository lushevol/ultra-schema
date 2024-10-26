import FieldsSchemas from '../database/fields-schema';
import { ratanFields2JsonSchema } from './ratan-fields-json-schema';

const generatedJsonSchema = ratanFields2JsonSchema(FieldsSchemas);

export default generatedJsonSchema;
