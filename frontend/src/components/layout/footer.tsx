import githubIcon from '../../assets/icons/github-original.svg';
import linkedinIcon from '../../assets/icons/linkedin-original.svg';
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-sm md:text-base">
                &copy; 2025 Luciano Oroquieta. Todos los derechos reservados.
            </h2>
            <div className="flex gap-6 text-sm md:text-base">
                <a
                    href="https://github.com/LucianoOroquietam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                >
                    <img
                        className="w-5 h-5"
                        src={githubIcon}
                        alt="Github"
                    />
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/luciano-oroquieta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                >
                    <img
                        className="w-5 h-5"
                        src={linkedinIcon}
                        alt="Linkedin"
                    />
                    LinkedIn
                </a>
            </div>
        </footer>
    );
};

export default Footer;
