import {
    CogIcon, FingerPrintIcon, DocumentReportIcon, XIcon,
    HomeIcon, UserIcon, UserGroupIcon, DocumentDuplicateIcon, OfficeBuildingIcon,
    CloudUploadIcon, DocumentTextIcon, DuplicateIcon, DatabaseIcon, CloudIcon,
    UsersIcon, BadgeCheckIcon, IdentificationIcon, LibraryIcon, ClipboardCheckIcon, ClipboardListIcon,
    DesktopComputerIcon, PaperClipIcon
} from '@heroicons/react/outline'
// const fetcherGrupo = (url: string): Promise<any> =>
//     fetch(url, { method: "GET" }).then(r => r.json());
// const { data: listaGrupo } = useSWRImmutable('/api/grupo/edicion', fetcherGrupo);

const navigation = [
    { name: 'Inicio', href: '/', icon: HomeIcon, current: true },
    {
        name: 'Seguridad', href: '', icon: FingerPrintIcon, current: false,
        children: [
            { name: 'Roles', href: '/rol', icon: IdentificationIcon, current: false }
        ],
    },
    {
        name: 'Entidades', href: '', icon: UserGroupIcon, current: false,
        children: [
            { name: 'Distrito', href: '/distrito', icon: OfficeBuildingIcon, current: false },
            { name: 'Empleado', href: '/empleado', icon: UserIcon, current: false },
            { name: 'Ciudadano', href: '/ciudadano', icon: UsersIcon, current: false }
        ],
    },
    {
        name: 'Configuración', href: '', icon: DatabaseIcon, current: false,
        children: [
            { name: 'Grupo', href: '/grupo', icon: DuplicateIcon, current: false },
            { name: 'Consideraciones', href: '/consideracion', icon: ClipboardListIcon, current: false },
            { name: 'Tipo Documento', href: '/tipo-documento', icon: DocumentDuplicateIcon, current: false },
            { name: 'Area', href: '/area', icon: LibraryIcon, current: false },
            { name: 'Requisitos', href: '/requisito', icon: ClipboardCheckIcon, current: false }
        ],
    },
    {
        name: 'Documento', href: '', icon: DocumentTextIcon, current: false,
        children: [
            { name: 'Documento', href: '/documento', icon: DocumentReportIcon }
        ],
    },
    {
        name: 'Digitalización', href: '', icon: CloudIcon, current: false,
        children: [
            { name: 'Registro de Documento', href: '/registro-documento', icon: CloudUploadIcon, current: false },
            { name: 'Prueba doc', href: '/pruebadoc', icon: CloudUploadIcon, current: false },
            { name: 'Demo', href: '/demo', icon: CloudUploadIcon, current: false },
        ],
    },
    {
        name: 'Tramites', href: '', icon: DesktopComputerIcon, current: false,
       
        children: [
            
            { name: 'Registro de Documento', href: '/registro-documento', icon: PaperClipIcon, current: false },
        ],
    },
    {
        name: 'Seguimiento', href: '', icon: BadgeCheckIcon, current: false,
        children: [
            { name: 'seguimiento', href: '/segimiento', icon: BadgeCheckIcon, current: false },
        ],
    },
    {
        name: 'Reporte', href: '', icon: DocumentReportIcon, current: false,
        children: [
            { name: 'Reporte De Empleados', href: '/rol', icon: DocumentReportIcon },
            { name: 'Reporte De Ciudadanos', href: '#', icon: DocumentReportIcon, current: false },
            { name: 'Reporte De Documentos', href: '#', icon: DocumentReportIcon, current: false },
        ],
    },
]

const secondaryNavigation = [
    { name: 'Tu Perfil', href: '/miperfil', icon: CogIcon },
]

export { navigation, secondaryNavigation }

function useSWRImmutable(arg0: string, fetcherEmpleado: (url: string) => Promise<any>): { data: any; } {
    throw new Error('Function not implemented.');
}
