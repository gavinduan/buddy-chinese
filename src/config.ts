import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { type StoredCompanion } from './types.js'

export interface Config {
  userId?: string
  companion?: StoredCompanion
}

const CONFIG_PATH = join(process.env.HOME || process.env.USERPROFILE || '.', '.buddy-chinese.json')

function getDefaultConfig(): Config {
  return {
    userId: process.env.USER || 'anon'
  }
}

export function getConfig(): Config {
  if (!existsSync(CONFIG_PATH)) {
    return getDefaultConfig()
  }
  
  try {
    const content = readFileSync(CONFIG_PATH, 'utf-8')
    return { ...getDefaultConfig(), ...JSON.parse(content) }
  } catch (error) {
    console.error('读取配置文件失败:', error)
    return getDefaultConfig()
  }
}

export function saveConfig(updater: (current: Config) => Config): void {
  const current = getConfig()
  const updated = updater(current)
  
  const dir = dirname(CONFIG_PATH)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  
  writeFileSync(CONFIG_PATH, JSON.stringify(updated, null, 2))
}
