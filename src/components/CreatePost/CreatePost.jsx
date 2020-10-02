import { Button, Form } from 'semantic-ui-react'
import NowPlaying from '../../components/NowPlaying/NowPlaying'
import * as spotifyService from '../../services/spotifyService'
import axios from "axios"

class CreatePost extends Component {
    state = { 
        formData: {
            invalidForm: false,
            title: '',
            song: '',
            picture: '',
            caption : '',
            star: false
        },
        nowPlaying: {
            name: 'Not Checked', 
            albumArt: '?', 
            artist: 'Not Checked',
            link: '',
            notChecked: false
        }
     }
    
    formRef = React.createRef()

    handleUploadFile = e => {
        e.preventDefault()
        console.log(e)
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        axios.post("/api/upload/image-upload", bodyFormData, {
            headers:{
            'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response);
            const imgUrl = response.data.imageUrl
            console.log(imgUrl)
            this.setState({
              picture: imgUrl,
            })
        }).catch(err =>{
            console.log(err);
        });
    }

    handleGetNowPlaying = async newPlayData => {
        const response = await spotifyService.getNowPlaying(newPlayData);
        this.setState({nowPlaying: { 
          name: response.item.name, 
          albumArt: response.item.album.images[0].url,
          artist: response.item.artists[0].name,
          link: response.item.external_urls.spotify,
          notChecked: true}});
      }

    handleSubmit = e =>{
        e.preventDefault();
        this.props.handleAddPost(this.state.formData)
    }

    handleChange = e => {
        const formData = {...this.state.formData, [e.target.name]: e.target.value};
        this.setState({
        formData,
        // invalidForm: !this.formRef.current.checkValidity()
        });
     }

    render() { 
        return ( 
            <>
                <NowPlaying 
                    handleGetNowPlaying={this.handleGetNowPlaying}
                    nowPlayingName = {this.state.nowPlaying.name}
                    nowPlayingArtist = {this.state.nowPlaying.artist}
                    nowPlayingAlbumArt = {this.state.nowPlaying.albumArt}
                    nowPlayingLink = {this.state.nowPlaying.link}
                    nowPlayingNotChecked = {this.state.nowPlaying.notChecked}/>
                <Form ref={this.formRef} onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Post Title:</label>
                        <input required value={this.state.formData.name} onChange={this.handleChange} name='name' type='text' placeholder='My Room' />
                    </Form.Field>
                    <Form.Field>
                        <label>Caption:</label>
                        <input required value={this.state.formData.caption} onChange={this.handleChange} name='name' type='text' placeholder='Caption your post' />
                    </Form.Field>
                    <Form.Field>
                        <label>Add a photo:</label>
                        <input type="file" name="picture" class="six wide field" onChange={this.handleUploadFile}></input>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='Starred Post?' />
                    </Form.Field>
                    <Button 
                        type='submit'
                        disable={this.state.invalidForm}>Submit</Button>
                </Form>
            </>
         );
    }
}
 
export default CreatePost;