import React, { Component } from 'react'
import { Button, Form, Checkbox, Container } from 'semantic-ui-react'
import NowPlaying from '../../components/NowPlaying/NowPlaying'
import * as spotifyService from '../../services/spotifyService'
import * as postsAPI from '../../services/posts-api'

class CreateSpotifyPost extends Component {
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

    handleGetNowPlaying = async newPlayData => {
        const response = await spotifyService.getNowPlaying(newPlayData);
        this.setState({nowPlaying: { 
          name: response.item.name, 
          albumArt: response.item.album.images[0].url,
          artist: response.item.artists[0].name,
          link: response.item.external_urls.spotify,
          notChecked: true}});
    }

    handleAddNowPlaying = async (newSong, postId) => {
        const updatedPost = await postsAPI.update(newSong, postId)
        const newPostsArray = this.props.posts.map(p =>
            p._id === updatedPost._id ? updatedPost : p)
        this.setState({posts: newPostsArray},
        () => this.props.history.push('/welcome'))
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

    async handleSubmitAndAddNowPlaying() {
        await this.handleSubmit()
        this.handleAddNowPlaying()
    }

    render() { 
        return ( 
            <>
            
            <Container>
            <br/><br/>
            <h1> Share some music with your roommates</h1>
            <br/>
                <NowPlaying 
                    handleGetNowPlaying={this.handleGetNowPlaying}
                    nowPlayingName = {this.state.nowPlaying.name}
                    nowPlayingArtist = {this.state.nowPlaying.artist}
                    nowPlayingAlbumArt = {this.state.nowPlaying.albumArt}
                    nowPlayingLink = {this.state.nowPlaying.link}
                    nowPlayingNotChecked = {this.state.nowPlaying.notChecked}/>
                <Form ref={this.formRef} onSubmit={this.handleSubmitAndAddNowPlaying}>
                    <Form.Field>
                        <label>About:</label>
                        <input required value={this.state.formData.name} onChange={this.handleChange} name='name' type='text' placeholder='' />
                    </Form.Field>
                    <Button
                        type='submit'
                        disable={this.state.invalidForm}>Submit Now Playing</Button>
                </Form>
                </Container>
            </>
         );
    }
}
 
export default CreateSpotifyPost;