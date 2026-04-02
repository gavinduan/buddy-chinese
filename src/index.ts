#!/usr/bin/env node

import { Command } from 'commander'
import { getCompanion, rollWithSeed, saveCompanion } from './companion.js'
import { renderSprite, renderFace, spriteFrameCount, RARITY_COLORS } from './sprites.js'
import { RARITY_STARS, RARITY_NAMES, SPECIES, SPECIES_NAMES, STAT_NAMES_CN, type Companion } from './types.js'
import { getConfig, saveConfig } from './config.js'

const program = new Command()

program
  .name('buddy')
  .description('终端版 Buddy 应用')
  .version('1.0.0')

function printSprite(sprite: string[]): void {
  console.log(sprite.join('\n'))
}

function printCompanionInfo(companion: Companion): void {
  const rarityColor = RARITY_COLORS[companion.rarity as keyof typeof RARITY_COLORS]
  
  console.log(`

${renderSprite(companion).join('\n')}

👋 ${companion.name}
${RARITY_STARS[companion.rarity as keyof typeof RARITY_STARS]} ${rarityColor(RARITY_NAMES[companion.rarity])} ${SPECIES_NAMES[companion.species]} ${companion.shiny ? '✨' : ''}
`)
  
  console.log('📊 统计信息:')
  Object.entries(companion.stats).forEach(([stat, value]) => {
    const bar = '█'.repeat(Math.floor((value as number) / 5))
    console.log(`  ${STAT_NAMES_CN[stat as keyof typeof STAT_NAMES_CN]}: ${bar} ${value}`)
  })
  
  console.log(`

💭 性格: ${companion.personality}

`)
}

program
  .command('show')
  .description('显示当前的 Buddy')
  .action(() => {
    const companion = getCompanion()
    if (companion) {
      printCompanionInfo(companion)
    } else {
      console.log('❌ 你还没有 Buddy！使用 `buddy hatch` 来孵化一个新的 Buddy。')
    }
  })

program
  .command('hatch')
  .description('孵化一个新的 Buddy')
  .option('--seed <seed>', '指定种子以获得相同的 Buddy')
  .action((options) => {
    const seed = options.seed || Date.now().toString()
    const { bones, inspirationSeed } = rollWithSeed(seed)
    
    console.log(`正在孵化新的 Buddy...`)
    printSprite(renderSprite(bones))
    
    const name = `Buddy_${Date.now().toString().slice(-6)}`
    const personality = ['友善的', '调皮的', '聪明的', '勇敢的', '好奇的'][Math.floor(Math.random() * 5)]
    
    const companion = {
      ...bones,
      name,
      personality,
      hatchedAt: Date.now()
    }
    
    saveCompanion(companion)
    console.log(`\n🎉 恭喜！你的新 Buddy ${name} 孵化成功！`)
    printCompanionInfo(companion)
  })

program
  .command('list')
  .description('列出所有可用的物种')
  .action(() => {
    console.log('🦄 可用的物种:')
    SPECIES.forEach((species, index) => {
      console.log(`  ${index + 1}. ${SPECIES_NAMES[species]} (${species})`)
    })
  })

program
  .command('animate')
  .description('展示 Buddy 的动画')
  .option('--fps <fps>', '动画帧率', '10')
  .action((options) => {
    const companion = getCompanion()
    if (!companion) {
      console.log('❌ 你还没有 Buddy！使用 `buddy hatch` 来孵化一个新的 Buddy。')
      return
    }
    
    const fps = parseInt(options.fps)
    const frameCount = spriteFrameCount(companion.species)
    let frame = 0
    
    console.log('\n按 Ctrl+C 停止动画\n')
    
    const interval = setInterval(() => {
      process.stdout.write('\u001B[2J\u001B[0f')
      printSprite(renderSprite(companion, frame))
      console.log(`\n${companion.name} (${SPECIES_NAMES[companion.species]})`)
      frame = (frame + 1) % frameCount
    }, 1000 / fps)
    
    process.on('SIGINT', () => {
      clearInterval(interval)
      process.stdout.write('\u001B[2J\u001B[0f')
      console.log('动画已停止')
      process.exit(0)
    })
  })

program
  .command('config')
  .description('配置管理')
  .option('--set <key>=<value>', '设置配置项')
  .option('--show', '显示当前配置')
  .action((options) => {
    if (options.show) {
      const config = getConfig()
      console.log(JSON.stringify(config, null, 2))
    } else if (options.set) {
      const [key, value] = options.set.split('=')
      saveConfig(config => ({
        ...config,
        [key]: value
      }))
      console.log(`✅ 配置项 ${key} 已设置为 ${value}`)
    } else {
      console.log('使用 --set 或 --show 参数')
    }
  })

program.parse(process.argv)
