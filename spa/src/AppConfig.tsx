export default {
    API: process.env.REACT_APP_API!,
    TRANSLATIONS_API: `${process.env.REACT_APP_API}/translations`,
    COGNITIVE_SVC_REGION: process.env.REACT_APP_CS_REGION!,
    COGNITIVE_SVC_API_KEY: process.env.REACT_APP_CS_KEY!
}