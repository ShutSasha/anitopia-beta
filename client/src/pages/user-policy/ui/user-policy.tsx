import { FC } from 'react'
import { Header } from '../../../widgets/header'
import { ContentContainer, Footer, Wrapper } from '@widgets/index'
import { Collapse } from './collapse'
import {
   ACCOUNT_BLOCKING_FEATURES,
   PERSONAL_ACCOUNT_CUSTOMIZATION_RULES,
   RULES_OF_COMMUNICATION,
} from '../consts/rules'
import styles from './styles.module.scss'
export const UserPolicy: FC = () => {
   return (
      <Wrapper>
         <Header />
         <ContentContainer
            style={{
               backgroundColor: '#fff',
               padding: '50px 20px',
               marginBottom: '50px',
               borderBottomRightRadius: '10px',
               borderBottomLeftRadius: '10px',
            }}
         >
            <h2 className={styles.anitopia_rules_title}> Правила користування платформою Anitopia</h2>

            <h2 className={styles.rule_title_of_topic}>1. Правила спілкування</h2>
            <div className={styles.rules_list}>
               {RULES_OF_COMMUNICATION.map((rule, index) => (
                  <Collapse key={index} title={rule.title} description={rule.description} />
               ))}
            </div>
            <h2 className={styles.rule_title_of_topic}>2. Правила кастомізації особистого акаунту</h2>
            <div className={styles.rules_list}>
               {PERSONAL_ACCOUNT_CUSTOMIZATION_RULES.map((rule, index) => (
                  <Collapse key={index} title={rule.title} description={rule.description} />
               ))}
            </div>
            <h2 className={styles.rule_title_of_topic}>3. Особливості блокування акаунту</h2>
            <div className={styles.rules_list}>
               {ACCOUNT_BLOCKING_FEATURES.map((rule, index) => (
                  <Collapse key={index} title={rule.title} description={rule.description} />
               ))}
            </div>
         </ContentContainer>
         <Footer />
      </Wrapper>
   )
}
