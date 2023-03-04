import { Component } from 'react/cjs/react.production.min';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    constructor(props) {
        super(props); 
        console.log('constructor')
        // setInterval(this.updateChar, 3000);
    }
    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        console.log('mount')
    }

    componentDidUpdate() {
        console.log('update')
    }

    componentWillUnmount() {
        console.log('unmount')
    }

    onCharLoaded = char => {
        console.log('update')
        this.setState({
            char,
            loading: false
        })
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    };

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded) //можна було записати так -  res => onCharLoaded(res)
            .catch(this.onError);
    }

    render() {
        console.log('render')
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const { name, desc, thumbnail, homepage, wiki } = char;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{desc}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div >
    )
}
export default RandomChar;