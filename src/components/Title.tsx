interface TitleProps {
    text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
    return <h1 className="text-3xl font-bold text-primary mb-6">{text}</h1>
}

export default Title;