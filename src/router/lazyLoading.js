// lazy loading Components
export default (name, index = false) => () => import(`@/components/${name}${index ? '/index' : ''}.vue`);
