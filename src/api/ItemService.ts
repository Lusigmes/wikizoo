export function itemListaHome(){
    return[
        {
            title: 'Home',
            disabled: true,
            href: '/',
        }
    ]
}

export function itemListaCatalogo(){
    return[
        {
            title: 'Home',
            disabled: false,
            href: '/',
        },
        {
            title: 'Wiki',
            disabled: true,
            href: '#',
        },
    ]
}
export function itemListaEspecieDetalhes(nome: string = ''){
    return[
        {
            title: 'Home',
            disabled: false,
            href: '/',
        },
        {
            title: 'Wiki',
            disabled: false,
            href: '/wiki/catalogo',
        },
        { title: nome || '', disabled: true, href: '#' },
    ]
}

