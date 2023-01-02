import {CREATE_JOB_MUTATION, JOB_QUERY, JOBS_QUERY, COMPANY_QUERY} from '../graphql/queries';
import {useMutation, useQuery} from '@apollo/client' 
import { getAccessToken } from '../auth';

export function useCompany(id) {
    const {data, loading, error} = useQuery(COMPANY_QUERY, {
        fetchPolicy: 'network-only',
        variables: {id}
      })
      return {
        company: data?.company,
        loading,
        error: Boolean(error)
      }
}

export function useJob(id) {
    const {data, loading, error} = useQuery(JOB_QUERY, {
        fetchPolicy: 'network-only',
        variables: {id}
      })
      return {
        job: data?.job,
        loading,
        error: Boolean(error)
      }
}

export function useJobs() {
    const {data, loading, error} = useQuery(JOBS_QUERY, {
      fetchPolicy: 'network-only'
    })
    return {
      jobs: data?.jobs,
      loading,
      error: Boolean(error)
    }
  }

export async function useCreateJob(title, description) {
    const [mutate, {loading, error}] = useMutation(CREATE_JOB_MUTATION)
    const {data: {job}} = await mutate({
        variables: {input: {title, description} },
        context: {headers: { 'Authorization': 'Bearer ' + getAccessToken() }},
        update: (cache,  {data: {job}}) => {
          cache.writeQuery({
              query: JOB_QUERY,
              variables: {id: job.id},
              data: {job}
          })
      }
      })
      return {
        job,
        loading,
        error: Boolean(error)
      }
}