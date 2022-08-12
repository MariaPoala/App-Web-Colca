import {
    CogIcon, FingerPrintIcon, DocumentReportIcon, XIcon,
    HomeIcon, UserIcon, UserGroupIcon, DocumentDuplicateIcon, OfficeBuildingIcon,
    CloudUploadIcon, DocumentTextIcon, DuplicateIcon, DatabaseIcon, CloudIcon,
    UsersIcon, DocumentSearchIcon, IdentificationIcon, LibraryIcon, ClipboardCheckIcon, ClipboardListIcon,
    DesktopComputerIcon, PaperClipIcon
} from '@heroicons/react/outline'
// const fetcherGrupo = (url: string): Promise<any> =>
//     fetch(url, { method: "GET" }).then(r => r.json());
// const { data: listaGrupo } = useSWRImmutable('/api/grupo/edicion', fetcherGrupo);

const navigation_usuario = [
    { name: 'Inicio', href: '/', icon: HomeIcon, current: true },
    
    {
        name: 'Entidades', href: '', icon: UserGroupIcon, current: false,
        children: [
            { name: 'Distrito', href: '/entidad/distrito', icon: OfficeBuildingIcon, current: false },
            { name: 'Anexo', href: '/entidad/anexo', icon: OfficeBuildingIcon, current: false },
            { name: 'Persona', href: '/entidad/persona', icon: UserIcon, current: false },
            { name: 'Empresa', href: '/entidad/empresa', icon: UsersIcon, current: false }
        ],
    },
    {
        name: 'Digitalización', href: '', icon: CloudIcon, current: false,
        children: [
            { name: 'Documentos', href: '/documento/documento', icon: CloudUploadIcon, current: false }
        ],
    },
    {
        name: 'Tramites', href: '', icon: DesktopComputerIcon, current: false,
        children: [
            
            {    name: 'Solicitud' , href: '/documento/solicitud', icon: DocumentSearchIcon, current: false },
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


export { navigation_usuario }

