import { format, formatDistanceToNow, set } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { useState } from 'react'

export function Post({ author, publishedAt, content }) {
  // Criar um estado para o React acompanhar
  const [comments, setComments] = useState(['Post muito bacana, hein!!!!!'])

  // 'newCommentText' monitora em tempo real oq está sendo escrito naa textarea

  const [newCommentText, setnewCommentText] = useState('')

  const publishedDateFormatted = format(
    publishedAt,
    "dd 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR
    }
  )

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  // Criar um novo comentario
  function handleCreateNewComment() {
    event.preventDefault() // Para não fazer o padrão do HTML

    setComments([...comments, newCommentText])
    setnewCommentText('')
  }

  function handleNewCommentChange() {
    setnewCommentText(event.target.value)
  }

  // Não deixar comentar sem nada
  function handleNewCommentInvalid() {
    event.target.setCustomValidity('')
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  // Deletar um comentario
  function deleteComment(commentToDelete) {
    const commentsWithoutDeleteOne = comments.filter(comment => {
      return comment != commentToDelete
    })

    setComments(commentsWithoutDeleteOne)
  }

  const isNewCommentEmpty = newCommentText.length == 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type == 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type == 'link') {
            return (
              <p key={line.content}>
                <a href={line.content}>{line.content}</a>
              </p>
            )
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feeback</strong>
        <textarea
          onChange={handleNewCommentChange}
          name="comment"
          value={newCommentText}
          placeholder="Deixe um comentário"
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}
