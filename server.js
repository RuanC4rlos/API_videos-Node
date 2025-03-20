// Iniciando Server Com Fastify
import {fastify} from 'fastify'
import {DatabaseMemory} from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

server.post('/videos', (req, reply)=> {
    const {title, description, duration} = req.body
    
    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', (req)=> {
    const search = req.query.search
    const videos = database.list(search)

    return videos
})

server.put('/videos/:id', (req, reply)=> {
    const videoId = req.params.id
    const {title, description, duration} = req.body
    
    const video = database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', (req, reply)=> {
    const videoId = req.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({port: 3333})