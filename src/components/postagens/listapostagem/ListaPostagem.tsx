import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaPostagem.css';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([])
  let history = useHistory();

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      toast.error('Você precisa estar logado', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      history.push("/login")

    }
  }, [token])

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPost()

  }, [posts.length])

  return (
    <>
      {
        posts.map(post => (
          <Box m={2} className="background">
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Postagens
                </Typography>
                <Typography variant="body2" component="p">
                  {post.tema?.descricao}
                </Typography>
                <Typography variant="h5" component="h2">
                  {post.titulo}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.texto}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>
                  <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft botaoUPTADE" size='small' color="primary" >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none ">
                    <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary" className="botaoDELETE"> 
                        deletar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))
      }
    </>
  )
}

export default ListaPostagem;