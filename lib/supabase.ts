import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.TRABELO_SUPABASE_URL!
const supabaseKey = process.env.TRABELO_SUPABASE_SECRET!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Stage = 'new' | 'contacted' | 'audited' | 'demo' | 'proposal' | 'won' | 'lost'
export type Source = 'manual' | 'companies_house' | 'planning' | 'referral'
export type InteractionType = 'call' | 'email' | 'meeting' | 'audit_sent' | 'demo' | 'proposal_sent'

export interface Company {
  id: string
  name: string
  website: string | null
  sector: string | null
  phone: string | null
  address: string | null
  postcode: string | null
  companies_house_number: string | null
  source: Source
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  company_id: string
  name: string
  role: string | null
  email: string | null
  phone: string | null
  is_primary: boolean
  created_at: string
}

export interface Pipeline {
  id: string
  company_id: string
  stage: Stage
  assigned_to: string | null
  audit_slug: string | null
  concept_url: string | null
  proposal_url: string | null
  next_action: string | null
  next_action_date: string | null
  won_value: number | null
  lost_reason: string | null
  created_at: string
  updated_at: string
}

export interface Interaction {
  id: string
  company_id: string
  type: InteractionType
  date: string
  notes: string | null
  by: string | null
  outcome: string | null
  created_at: string
}

export interface CompanyWithPipeline extends Company {
  pipeline: Pipeline | null
  contacts: Contact[]
  interactions: Interaction[]
}
